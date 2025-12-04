import React, { useContext, createContext, useState } from "react";
import mobileProjectOne from "../assets/mobile_project_one.jpg";



// Create the context
const GlobalContext = createContext();

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({
        profile: {
            name: "Andi Surya Alam",
            title: "GIS Developer | Tenaga Ahli Sistem Informasi Geografis – Bapenda Jombang",
            location: "Kediri, East Java, ID",
            summary: "I'm a GIS Developer who transforms complex spatial data into intuitive, high-performance applications. With over 3 years of experience at Bapenda Jombang, I specialize in building full-stack solutions that help governments make data-driven decisions—from tax management systems to mobile survey apps. I enjoy turning messy spatial datasets into clean, actionable insights using PostGIS, React, and modern web technologies.",
            skills: ["React", "Node.js", "Ionic JS", "React Native", "Laravel", "PostGIS", "PostgreSQL", "Git", "ArcGis", "QGIS"],
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            contact: {
                email: "andalam2@gmail.com",
                whatsapp: "+6281234567890",
                github: "https://github.com/suryaalam12",
                linkedin: "https://www.linkedin.com/in/andisuryaalam"
            }
        },
        projects: [
            {
                id: 1,
                title: "SISMIOP PBB-P2 & BPHTB",
                category: "webmap",
                description:
                    "A comprehensive web-based GIS platform for managing spatial data related to tax records. It integrates PostGIS for spatial processing and provides real-time geospatial analysis tools.",
                technologies: ["React", "Laravel", "PostGIS", "Turf.js"],
                images: [
                    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                ],
                imageDescriptions: [
                    "Interactive map dashboard displaying tax parcels with real-time spatial analysis and filtering capabilities.",
                    "Advanced property search interface with PostGIS-powered spatial queries and data visualization.",
                    "Tax record management system showing detailed parcel information and historical data.",
                    "Geospatial analytics dashboard with Turf.js integration for complex spatial operations."
                ]
            },
            {
                id: 2,
                title: "Sipedas Mobile",
                category: "mobile",
                description:
                    "Mobile application for field surveyors to collect and update spatial data offline. Features GPS tracking and photo documentation.",
                technologies: ["React Native", "SQLite", "Node.js"],
                images: [
                    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                ],
                imageDescriptions: [
                    "Dashboard view showing real-time surveyor locations and active tasks.",
                    "Data collection form with offline capabilities and photo attachment.",
                    "Map interface for assigning tasks to specific geographic areas.",
                    "Profile settings and synchronization status with the central server."
                ]
            },
            {
                id: 3,
                title: "Gretel Tracking",
                category: "mobile",
                description:
                    "Real-time location tracking app for monitoring field personnel and assets with geofencing capabilities.",
                technologies: ["Flutter", "Firebase", "Google Maps"],
                images: [
                    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                ],
                imageDescriptions: [
                    "Live tracking view of field personnel on Google Maps.",
                    "Geofence management interface for setting up restricted zones.",
                    "Asset history playback showing historical movement paths.",
                    "Alert configuration for speed limits and zone breaches."
                ]
            },
        ],
        activities: [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
                caption: "Conducting field survey for tax parcel verification in Jombang district",
                date: "November 28, 2024",
                tags: ["fieldwork", "survey", "gis"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_1/"
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                caption: "Team meeting discussing SISMIOP system improvements and new features",
                date: "November 25, 2024",
                tags: ["teamwork", "planning", "development"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_2/"
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                caption: "Analyzing spatial data patterns for property tax optimization",
                date: "November 20, 2024",
                tags: ["analytics", "postgis", "data"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_3/"
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
                caption: "Presenting quarterly GIS development progress to stakeholders",
                date: "November 15, 2024",
                tags: ["presentation", "reporting"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_4/"
            },
            {
                id: 5,
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
                caption: "Training session on mobile survey app for field officers",
                date: "November 10, 2024",
                tags: ["training", "mobile", "education"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_5/"
            },
            {
                id: 6,
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
                caption: "Code review session with development team for new features",
                date: "November 5, 2024",
                tags: ["coding", "review", "collaboration"],
                instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID_6/"
            }
        ]
    });

    // Helper to expose state directly for simpler consumption if needed, 
    // though usually we destructure state in the consumer.
    const value = {
        ...state,
        state,
        setState
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;
};

// Export the context for advanced usage
export { GlobalContext };
