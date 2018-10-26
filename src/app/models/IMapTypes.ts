export interface IZoomAndCentre {
    centre: [number, number];
    zoom: number;
}

export interface IBasemap {
    title: string;
    url: string;
    thumbnailUrl: string;
    labelColor: string;
}

export interface IBasemaps {
    [id: string]: IBasemap
}