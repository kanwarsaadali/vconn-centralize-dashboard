'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';
import { Feature } from 'geojson'; // ✅ Add this import

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const eventCountries = ['PAK', 'IND', 'USA'];

const eventLocations = [
  { lat: 30.3753, lng: 69.3451, label: 'Pakistan' },
  { lat: 20.5937, lng: 78.9629, label: 'India' },
  { lat: 37.0902, lng: -95.7129, label: 'USA' },
];

export default function DA_EventMap() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-4"></h2>

      {/* 🔍 Bigger map box */}
      <div className="w-full h-[400px] md:h-[400px] xl:h-[450px]">
        <ComposableMap
          projection="geoMercator"
          width={800}
          height={400}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: Feature[] }) => // ✅ Explicit type
                geographies.map((geo: Feature, idx: number) => {
                  const isEventCountry =
                    "properties" in geo &&
                    eventCountries.includes(
                      (geo.properties as { ISO_A3?: string })?.ISO_A3 ?? ""
                    );

                  return (
                    <Geography
                      key={idx}
                      geography={geo}
                      style={{
                        default: {
                          fill: isEventCountry ? '#3b82f6' : '#E5E7EB',
                          outline: 'none',
                        },
                        hover: {
                          fill: isEventCountry ? '#2563eb' : '#d1d5db',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#1d4ed8',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {eventLocations.map((location, idx) => (
              <Marker key={idx} coordinates={[location.lng, location.lat]}>
                <circle r={6} fill="#ef4444" stroke="#fff" strokeWidth={1.5} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: 'sans-serif', fontSize: 12 }}
                >
                  {location.label}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
