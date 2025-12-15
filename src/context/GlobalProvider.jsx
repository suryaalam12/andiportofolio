import React, { useContext, createContext, useState } from "react";
import mobileProjectOne from "../assets/mobile_project_one.jpg";
import webmapLoadBigData from "../assets/webmap_load_big_data.png";
import webmapSpatialEdit from "../assets/webmap_spatial_editt.png";
import webmapSpatialQuery from "../assets/webmap_spatial_query.png";
import webmapStreetView from "../assets/webmap_street_view.png";
import webmapThematicMap from "../assets/webmap_thematic_map.png";

import a1Login from "../assets/a1_login.jpeg";
import a1Street from "../assets/a1_street.jpeg";
import a1Data from "../assets/a1_data.jpeg";
import a1Cluster from "../assets/a1_cluster.jpeg";

import a2AdminProgress from "../assets/a2_admin_progress.png";
import a2Labeling from "../assets/a2_labeling.png";
import a2Login from "../assets/a2_login.png";
import a2Progres from "../assets/a2_progres.png";
import a2Symbology from "../assets/a2_symbology.png";

import a3Login from "../assets/a3_login.png";
import a3Property from "../assets/a3_property.png";
import a3Analysis from "../assets/a3_analaysis.png";
import a3Pov from "../assets/a3_pov.png";
import a3Catalog from "../assets/a3_cataloglist.png";

import actEspos from "../assets/act_espos.png";
import actPdl from "../assets/act_pdl.png";
import actStuba from "../assets/act_stuba.png";
import actZonasi from "../assets/act_zonasi.png";



// Create the context
const GlobalContext = createContext();

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({
        profile: {
            name: "Andi Surya Alam",
            title: "GIS Developer | Tenaga Ahli Sistem Informasi Geografis – Bapenda Jombang",
            location: "Kediri, East Java, ID",
            summary: "I'm a GIS Developer with over 3 years of professional experience builds powerful web-based mapping solutions. I specialize in transforming big geospatial data into fast, interactive map applicationsp. My expertise includes handling large-scale datasets, performing complex server-side spatial queries, and architecting modern web GIS applications using the modern JavaScript frameworks and backend technologies. I create mapping solutions that are not just functional, but scalable, performant, and built to last.",
            skills: [
                { category: "Frontend Development", items: ["React", "React Native", "Ionic JS"] },
                { category: "Backend Development", items: ["Node.js", "Laravel"] },
                { category: "Geospatial Database", items: ["PostGIS", "PostgreSQL"] },
                { category: "GIS Tools", items: ["ArcGIS", "QGIS"] },
                { category: "DevOps & Infrastructure", items: ["Docker", "Redis", "Git"] }
            ],
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            contact: {
                email: "andalam2@gmail.com",
                whatsapp: "+6287887961807",
                github: "https://github.com/suryaalam12",
                linkedin: "http://linkedin.com/in/andisuryaalam/"
            }
        },
        projects: [
            {
                id: 1,
                title: "WEBMAP PBB",
                category: "webmap",
                description:
                    "A comprehensive web-based GIS platform for managing spatial data related to tax records. It integrates PostGIS for spatial processing and provides real-time geospatial analysis tools.",
                technologies: ["React", "Laravel", "PostGIS", "Turf.js", "Redis", "FrankenPHP", "Docker"],
                images: [
                    webmapLoadBigData,
                    webmapSpatialEdit,
                    webmapSpatialQuery,
                    webmapThematicMap,
                    webmapStreetView,
                ],
                imageDescriptions: [
                    "To handle large-scale spatial data visualization with high performance, each village serves about 3,000 GeoJSON features and the app has 306 users accessing data for their respective villages in Jombang, so I use Redis caching to reduce repeated data loads and a GeoJSON unzip/decompression library to minimize container memory usage, and the entire application is wrapped with FrankenPHP to fully utilize all available container CPU cores and handle sudden spikes in user requests efficiently",
                    "The spatial-data updating workflow is managed in a dedicated editing module, which uses PostGIS for geometry editing and Turf.js to adjust block boundaries after modifications. The module also includes specialized routines for updating and mapping tax-object data, ensuring that these records remain accurate and properly aligned within the spatial dataset",
                    "After the spatial and attribute data are updated, the dataset is assessed using the land-value zoning model to determine appropriate annual tax policies. By leveraging PostGIS and NoSQL technologies in spatial queries, the system can efficiently handle large-scale inserts and updates, ensuring that PBB (land and building tax) values in Jombang Regency remain accurate and up-to-date.",
                    "The system integrates core PBB tax data from the Oracle-based DBMS with spatial data in PostGIS to produce thematic maps. By merging Oracle queries with PostGIS operations, the application ensures that tax data and spatial information are correctly aligned and fully integrated, enabling accurate visualization and analysis of PBB-related information.",
                    "To support users in verifying tax objects, the application is also integrated with Google Street View, allowing them to observe real-world conditions on the ground. This feature enhances the accuracy and reliability of tax assessments by providing visual context alongside spatial and attribute data."
                ]
            },
            {
                id: 2,
                title: "Tapak Ijo Reborn",
                category: "mobile",
                description:
                    "An enhanced version of the previous Tapak Ijo application, focused on field data collection with added PostGIS query analysis, Leaflet clustering, and integration with Google Street View.",
                technologies: ["Ionic", "React", "Node.js", "PostGIS"],
                images: [
                    a1Login,
                    a1Cluster,
                    a1Data,
                    a1Street
                ],
                imageDescriptions: [
                    "An enhanced version of the previous Tapak Ijo application, focused on field data collection with added PostGIS query analysis, Leaflet clustering, and integration with Google Street View.",
                    "Clustered map view for efficient visualization of large volumes of field data points. In this feature, I combined two external APIs: one for loading property data and another for integrating data stored in PostgreSQL. This setup enables PostGIS queries for spatial analysis and additional tax-related data input.",
                    "Property detail modal displaying in-depth field survey data, along with search and filtering features based on specific criteria. It also includes synchronized data selection based on coordinates using PostGIS queries, improving upon the previous implementation that stored map data only as strings.",
                    "Google Street View integration for visual verification of field data."
                ]
            },
            {
                id: 3,
                title: "E-SPOS PKB",
                category: "mobile",
                description:
                    "A field application for the validation and verification of PKB (Motor Vehicle Tax) data. This app enables officers to track vehicles in real time, supported by PBB-P2 parcel data to simplify and accelerate field surveys.",
                technologies: ["Ionic", "React", "Redis", "Node.js", "Docker"],
                images: [
                    a2Login,
                    a2Symbology,
                    a2Labeling,
                    a2Progres,
                ],
                imageDescriptions: [
                    "A field application for the validation and verification of PKB (Motor Vehicle Tax) data, supported by PBB-P2 spatial data to simplify and accelerate field surveys.",
                    "I integrated East Java provincial tax arrears data, allowing field surveyors to clearly view prepared address information directly within the E-SPOS PKB application.",
                    "Utilizes an external PBB API to display parcel labels for each land plot, helping field surveyors quickly identify and locate PKB owner address data.",
                    "To monitor field surveyors’ work progress, I developed an admin dashboard that displays task statuses and daily activity summaries. This enables better coordination and real-time operational strategy adjustments."
                ]
            }
            ,
            {
                id: 4,
                title: "Makelar App",
                category: "mobile",
                description:
                    "A comprehensive real estate mobile application for property listings, spatial analysis, and agent management. This project is currently in progress and features interactive property catalogs, point-of-view (POV) imagery for property visualization, and advanced spatial analysis tools to help agents and buyers make informed decisions.",
                technologies: ["Ionic", "Firebase", "Gemini", "Node.js", "React"],
                images: [
                    a3Login,
                    a3Property,
                    a3Pov,
                    a3Analysis,
                    a3Catalog,
                ],
                imageDescriptions: [
                    "A comprehensive real estate mobile application for property listings, spatial analysis, and agent management. This project is currently in progress and features interactive property catalogs, point-of-view (POV) imagery for property visualization, and advanced spatial analysis tools to help agents and buyers make informed decisions.",
                    "Detailed property view displaying comprehensive information including images, specifications, pricing, and location data with interactive maps.",
                    "Point-of-view (POV) feature providing immersive property visualization, allowing users to explore properties through panoramic imagery and virtual tours.",
                    "Advanced spatial analysis powered by Gemini AI, leveraging Points of Interest (POI) data, heat maps for population density and activity patterns, and real-time traffic data to provide intelligent property recommendations and market insights for data-driven decision making.",
                    "Comprehensive property catalog with advanced search and filtering capabilities, enabling users to browse listings by location, price range, property type, and custom criteria."
                ]
            },
        ],
        activities: [
            {
                id: 1,
                image: actZonasi,
                caption: "Zonasi: Spatial analysis and land-value zoning",
                date: "February 28, 2024",
                tags: ["gis", "analytics"],
                instagramUrl: "https://www.instagram.com/reel/DHU5OKthRSy/?igsh=czF5NW94bmh3Ym5o"
            },
            {
                id: 2,
                image: actStuba,
                caption: "Hosting a study visit to share WebGIS implementation practices",
                date: "April 25, 2024",
                tags: ["teamwork", "planning", "development"],
                instagramUrl: "https://www.instagram.com/reel/DIscpVIB74I/?igsh=MWRiOWV3Z3h0cmY4cA=="
            },
            {
                id: 3,
                image: actEspos,
                caption: "ESPOS: Field survey for vehicle tax mapping and data collection",
                date: "October 13, 2025",
                tags: ["survey", "data"],
                instagramUrl: "https://www.instagram.com/reel/DQWgbPiAX2V/?igsh=dDZyZm9rZWJrMnU1"
            },
            {
                id: 4,
                image: actPdl,
                caption: "Tapak Ijo: On-site presentations and reporting",
                date: "August 15, 2025",
                tags: ["presentation", "reporting"],
                instagramUrl: "https://www.instagram.com/reel/DI0n8mkBv60/?igsh=MThqamZtenp0eXM2aA=="
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
