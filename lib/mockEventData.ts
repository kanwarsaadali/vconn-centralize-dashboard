// lib/mockEventData.ts

const mockEventData = [
  {
    eventTime: "Jul 1, 2025 @ 02:43:25.735",
    sourceIP: "141.98.10.225",
    targetUser: "Administrator",
    failureReason: "%32313",
    statusCode: "STATUS_LOGON_FAILURE",
    environment: "PROD",
    serverOwner: "S Irfan",
    serverName: "csonlinedb_ibm",
  },
  {
    eventTime: "Jul 1, 2025 @ 02:42:37.323",
    sourceIP: "128.1.112.100",
    targetUser: "Centadmin",
    failureReason: "%32313",
    statusCode: "STATUS_LOGON_FAILURE",
    environment: "PROD",
    serverOwner: "S Irfan",
    serverName: "gsdsks",
  },
  // 👉 Add more fake/mock entries here for testing
   {
    id: 'evt1',
    serverName: 'Server-A',
    location: { lat: 31.5204, lng: 74.3587 },
    eventType: 'Login Failure',
    targetUser: 'admin',
  },
  {
    id: 'evt2',
    serverName: 'Server-B',
    location: { lat: 24.8607, lng: 67.0011 },
    eventType: 'Root Access',
    targetUser: 'root',
  },
  {
  id: '1',
  serverName: 'Server A',
  targetUser: 'user1',
  status: 'success', // <-- important
  location: { lat: 30.1, lng: 70.2 }
}

];

export default mockEventData;
