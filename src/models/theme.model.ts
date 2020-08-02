export default interface Theme {
    bodyColor: string
    bodySecundaryColor: string
    ligthColor: string
    darkColor: string
    successColor: string
    dangerColor: string
    primaryColor: string
    primaryColorLight: string
    primaryColorVeryLight: string
    textPrimaryColor: string
    textSecundaryColor: string
}

export interface ThemeInnerModel {
    theme: Theme
}