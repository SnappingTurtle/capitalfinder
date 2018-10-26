import { IZoomAndCentre, IBasemaps, IBasemap } from '../models/IMapTypes';


export class MapConfig {
    static readonly mapCentreUSA: IZoomAndCentre = {
        centre: [-98.849, 40.366],
        zoom: 6
    }

    static readonly baseMaps: any =  {
        'Open Street Maps':
            { 
                title: "Open Street Maps",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/5d2bfa736f8448b3a1708e1f6be23eed/info/thumbnail/temposm.jpg',
                labelColor: 'rgba(0,0,0,1)'
              },
         
        'National Geographic':
              {
                title: 'National Geographic',
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/509e2d6b034246d692a461724ae2d62c/info/thumbnail/natgeo.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Satellite':
              {
                title: "Satellite",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Streets':
              {
                title: "Streets",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/d8855ee4d3d74413babfb0f41203b168/info/thumbnail/world_street_map.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Topographic':
              {
                title: "Topographic",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/6e03e8c26aad4b9c92a87c1063ddb0e3/info/thumbnail/topo_map_2.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Terrain':
              {
                title: "Terrain",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/aab054ab883c4a4094c72e949566ad40/info/thumbnail/terrain_labels.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Oceans':
              {
                title: "Oceans",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/48b8cec7ebf04b5fbdcaf70d09daff21/info/thumbnail/tempoceans.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Dark Gray':
              {
                title: "Dark Gray",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/25869b8718c0419db87dad07de5b02d8/info/thumbnail/DGCanvasBase.png',
                labelColor: 'rgba(0,255,0,1)'
              },
        'Light Gray':
              {
                title: "Light Gray",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg',
                labelColor: 'rgba(0,255,0,1)'
              },
        'ESRI OSM':
              {
                title: "ESRI OSM",
                url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/5d2bfa736f8448b3a1708e1f6be23eed/info/thumbnail/temposm.jpg',
                labelColor: 'rgba(0,255,0,1)'
              }
        
    }     
    
}