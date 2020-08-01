import colorConverter from 'color-convert'
import {HSL} from "color-convert/conversions";

export const stringToHashColor = (str: string, saturation = 30, lightness = 90): string => {

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let h = hash % 360;
    const hslColor: HSL = [h, saturation, lightness]
    const color = colorConverter.hsl.hex(hslColor)
    return '#' + color
}

export const hexToRgba = (hexColor: string, opacity: number): string => {
    const rgbColor = colorConverter.hex.rgb(hexColor)
    return `rgba(${rgbColor.join(',')}, ${opacity})`
}