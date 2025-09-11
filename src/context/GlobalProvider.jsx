import React, { useContext, createContext, useState } from "react";

// Import video files
import video1_1 from "../assets/p_1_1.mp4";
import video1_2 from "../assets/p_1_2.mp4";
import video1_3 from "../assets/p_1_3.mp4";
import video1_4 from "../assets/p_1_4.mp4";
import video2_1 from "../assets/p_2_1.mp4";
import video2_2 from "../assets/p_2_2.mp4";
import video2_3 from "../assets/p_2_3.mp4";
import video1_5 from "../assets/p_1_5.mp4";

// Create the context
const GlobalContext = createContext();

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({
        profile: {
            name: "Andi Surya Alam",
            title: "GIS Developer | Tenaga Ahli Sistem Informasi Geografis – Bapenda Jombang",
            location: "Kediri, East Java, ID",
            summary: "Passionate full-stack developer with 3+ years of experience building innovative GIS applications for web and mobile platforms. Specialized in modern JavaScript frameworks, PHP frameworks, PostGIS, PostgreSQL, and Spatial Data Processing GIS with App ✨ I enjoy transforming complex problems into simple, elegant, and user-friendly solutions.",
            skills: ["React", "Node.js", "Ionic JS", "React Native", "Laravel", "PostGIS", "PostgreSQL", "Git", "ArcGis", "QGIS"],
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            contactLinks: {
                email: "andalam2@gmail.com",
                whatsapp: "+6281234567890",
                github: "https://github.com/suryaalam12",
                linkedin: "https://www.linkedin.com/in/andisuryaalam"
            }
        },
        projects: [
            {
                id: 1,
                title: "Web GIS Application for Managing Spatial Data of PBB-P2 and Other Taxes",
                description:
                    "🗺️ A web-based GIS platform for managing spatial data related to PBB-P2 and other tax records using PostGIS and PostgreSQL. 🏗️ The system is developed with React and Laravel, integrating two relational databases: Oracle (for property data) and PostgreSQL with PostGIS (for spatial data processing). ⚡ On the client side, Turf.js handles real-time geospatial analysis, while Google Street View provides a verification layer for improved data accuracy.",
                image:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                technologies: ["React", "Laravel", "PostGIS", "PostgreSQL", "Oracle", "JWT"],
                featured: true,
                menu: [
                    {
                        id: "1",
                        label: "NJOP Zoning",
                        content:
                            "Developed a spatial analysis module using Turf.js to generate custom buffer zones, identify intersecting feature IDs, and process datasets with PostGIS queries such as ST_Intersection. 💰 This functionality supports zoning analysis for NJOP (Tax Object Selling Value).",
                        videoPath: video1_1
                    },
                    {
                        id: "2",
                        label: "PostGIS & Turf.js with Polygon Data",
                        content:
                            "⚙️ Implemented advanced geospatial operations in PostGIS, including geometry splitting (ST_Split), dataset merging (ST_Union), and intersection analysis (ST_Intersection) for precise spatial data management. 🌐 On the client side, Turf.js was used to transform and analyze GeoJSON data, dynamically retrieve intersecting features, render them on an interactive map, and save updated datasets seamlessly.",
                        videoPath: video1_2
                    },
                    {
                        id: "3",
                        label: "Thematic Mapping",
                        content:
                            "🔗 Built a data integration pipeline to perform left joins across external databases (PostgreSQL and Oracle), enabling customized thematic queries.Enhanced map symbology and integrated charting tools to improve spatial data visualization and interpretation for end-users.",
                        videoPath: video1_3
                    },
                    {
                        id: "4",
                        label: "Additional Features",
                        content:
                            "💡Integrated Google Street View into the platform, allowing users to conduct real-world assessments for tax evaluation and policy planning. Optimized API usage for extended free access — let's just say I found a way to keep Pegman working overtime without sending me an invoice. 😉",
                        videoPath: video1_4
                    }
                ]
            },
            {
                id: 2,
                title: "Mobile Survey App for Other Taxes (Advertising, Hotel, Restaurant, etc.)",
                description:
                    "📱 A mobile application built with Ionic JS and Node.js, designed to modernize legacy systems that stored geometry as varchar values, making spatial analysis difficult. 🔧 The new backend architecture leverages PostGIS, enabling advanced spatial operations such as intersections and buffers to help users and policymakers make better decisions.",
                image:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                technologies: ["Ionic JS", "Node.js", "PostGIS", "PostgreSQL", "JWT"],
                featured: true,
                menu: [
                    {
                        id: "1",
                        label: "Data Display",
                        content: "Implemented efficient data loading with marker clustering and geospatial indexing to significantly improve performance. ⚡. Integrated with legacy p APIs to overcome CORS restrictions, ensuring smooth data synchronization across mobile and web platforms.",
                        videoPath: video2_1
                    },
                    {
                        id: "2",
                        label: "Spatial Analysis for Location Input",
                        content: "💡Eliminated the need for manual location input by using ST_Intersect with land boundary datasets to automatically detect and assign land parcel names.",
                        videoPath: video2_2
                    },
                    {
                        id: "3",
                        label: "Pegman for Efficient Land Survey",
                        content: "👁️ Integrated Google Street View Pegman to help surveyors quickly assess site conditions and visualize land parcels more effectively.",
                        videoPath: video2_3
                    }
                ]
            },
            {
                id: 3,
                title: "Spatial Adjustment of Land and Building Tax Shapefile Data",
                description:
                    "",
                technologies: ["ArcGIS", "PostGIS", "PostgreSQL"],
                featured: true,
                menu: [{
                    id: "1",
                    label: "Pegman for Efficient Land Survey",
                    content: "I implemented a streamlined spatial pipeline using PostGIS to generate clean and accurate desa (village) and blok (block) boundary geometries. Key technologies and steps include: ST_Union to merge and unify multiple geometries into cohesive shapes PostGIS PostGIS . ST_Buffer for both outward and inward buffering, which helps smooth and refine boundaries; the ability to buffer by positive and negative values is intrinsic to the function PostGIS PostGIS . ST_Dump to split complex multipolygons into individual polygon parts, enabling more granular handling Stack Overflow GIS Stack Exchange . ST_ExteriorRing combined with ST_MakePolygon to strip away interior holes and preserve only the outer boundary rings—a method commonly used for simplifying polygon shapes Open Geospatial Technologies Stack Overflow . ST_Collect to recombine cleaned polygons into a single geometry, ensuring a cohesive final shape Stack Overflow Open Geospatial Technologies . ST_Transform to reproject geometries between coordinate systems (e.g., from UTM for metric operations and back to WGS84 for mapping applications)",
                    videoPath: video1_5
                }]
            },
        ],
    });

    return (
        <GlobalContext.Provider value={{ state, setState }}>
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
