'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';

// Use higher detail so microstates (like Monaco) are more likely present
const topoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Manual fixes for common API→TopoJSON name diffs
const COUNTRY_NAME_MAP: Record<string, string> = {
  'United States': 'United States of America',
  'Russia': 'Russian Federation',
  'South Korea': 'South Korea',
  'North Korea': 'North Korea',
  'Czech Republic': 'Czechia',
  'Hong Kong': 'Hong Kong SAR China',
  'Macau': 'Macao SAR China',
  'Vatican City': 'Vatican',
  'Côte d’Ivoire': "Cote d'Ivoire",
  'Cote dIvoire': "Cote d'Ivoire",
  'DR Congo': 'Democratic Republic of the Congo',
  'Congo (Brazzaville)': 'Republic of the Congo',
  'Syria': 'Syrian Arab Republic',
  'Moldova': 'Moldova',
  'Bolivia': 'Bolivia',
  'Tanzania': 'Tanzania',
};

// Fallback coordinates for tiny/edge cases (lng, lat)
const FALLBACK_COORDS: Record<string, [number, number]> = {
  Monaco: [7.4246, 43.7384],
  'Hong Kong': [114.1694, 22.3193],
  'Macao': [113.5439, 22.1987],
  'Vatican': [12.4534, 41.9029],
  'Singapore': [103.8198, 1.3521],
};

type EventRow = { country: string; count: number };

export default function EventMap() {
  const [eventData, setEventData] = useState<EventRow[]>([]);
  const [geoFeatures, setGeoFeatures] = useState<any[]>([]);

  // Normalize strings: lowercase, strip accents & non-letters
  const norm = (s: string) =>
    s
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z]/g, '');

  useEffect(() => {
    // 1) Fetch event data
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events-map`)
      .then((res) => res.json())
      .then((apiData) => {
        if (apiData?.data) {
          const formatted = apiData.data.map((item: Record<string, number>) => {
            const [country, count] = Object.entries(item)[0];
            return { country, count };
          });
          setEventData(formatted);
        }
      })
      .catch((err) => console.error('Error fetching event map data:', err));

    // 2) Fetch TopoJSON and convert to GeoJSON
    fetch(topoUrl)
      .then((res) => res.json())
      .then((topology) => {
        const geo = feature(topology, topology.objects.countries).features;
        setGeoFeatures(geo as any[]);
      })
      .catch((err) => console.error('Error fetching geo data:', err));
  }, []);

  // Helper: find a Geo feature for a given API country name
  const matchGeo = (apiName: string) => {
    if (!geoFeatures.length) return undefined;  
    const targetName = COUNTRY_NAME_MAP[apiName] || apiName;

    // exact normalized match
    const exact =
      geoFeatures.find(
        (g) => norm(g.properties.name || '') === norm(targetName)
      ) || undefined;
    if (exact) return exact;

    // contain/substring match (to handle "United States" vs "United States of America")
    const t = norm(targetName);
    const fuzzy =
      geoFeatures.find((g) => {
        const gn = norm(g.properties.name || '');
        return gn.includes(t) || t.includes(gn);
      }) || undefined;

    return fuzzy;
  };

  // For fast fill checks, build a Set of matched topo names
  const highlightedNames = useMemo(() => {
    const names = new Set<string>();
    const missing: string[] = [];
    for (const row of eventData) {
      const found = matchGeo(row.country);
      if (found?.properties?.name) {
        names.add(found.properties.name);
      } else {
        missing.push(row.country);
      }
    }
    if (missing.length) {
      // Helpful in dev tools to see what's not mapping
      // (e.g., ["Monaco"] on 110m, or custom labels)
      // eslint-disable-next-line no-console
      console.debug('No polygon match for:', missing);
    }
    return names;
  }, [eventData, geoFeatures]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-4">Event Map</h2>
      <div className="w-full h-[400px] md:h-[400px] xl:h-[450px]">
        <ComposableMap
          projection="geoMercator"
          width={800}
          height={400}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1}>
            {geoFeatures.length > 0 && (
              // <Geographies geography={{ type: 'FeatureCollection', features: geoFeatures }}>
              //   {({ geographies }) =>
              //     geographies.map((geo) => {
              <Geographies geography={{ type: 'FeatureCollection', features: geoFeatures }}>
  {({ geographies }: { geographies: any[] }) =>
    geographies.map((geo: any) => {

                    const isEventCountry = highlightedNames.has(geo.properties.name);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: isEventCountry ? '#3b82f6' : '#E5E7EB', outline: 'none' },
                          hover: { fill: isEventCountry ? '#2563eb' : '#d1d5db', outline: 'none' },
                          pressed: { fill: '#1d4ed8', outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}

            {/* Markers */}
            {eventData.map((row, idx) => {
              const matchedGeo = matchGeo(row.country);

              if (matchedGeo) {
                const [lng, lat] = geoCentroid(matchedGeo);
                return (
                  <Marker key={`${row.country}-${idx}`} coordinates={[lng, lat]}>
                    <circle r={6} fill="#ef4444" stroke="#fff" strokeWidth={1.5} />
                    <text textAnchor="middle" y={-10} style={{ fontFamily: 'sans-serif', fontSize: 12 }}>
                      {`${row.country} (${row.count})`}
                    </text>
                  </Marker>
                );
              }

              // Fallback point for tiny or missing polygons (e.g., Monaco)
              const fallback = FALLBACK_COORDS[row.country];
              if (fallback) {
                return (
                  <Marker key={`${row.country}-${idx}-fallback`} coordinates={fallback}>
                    <circle r={6} fill="#ef4444" stroke="#fff" strokeWidth={1.5} />
                    <text textAnchor="middle" y={-10} style={{ fontFamily: 'sans-serif', fontSize: 12 }}>
                      {`${row.country} (${row.count})`}
                    </text>
                  </Marker>
                );
              }

              // If we truly can't place it, at least log it for you
              console.debug('No coords for country:', row.country);
              return null;
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
