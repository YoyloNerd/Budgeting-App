export default function getColorPalette(color) {
    let palette = ""
    try {
        palette = require(`./${color}.json`);
    } catch (err) {
        palette = null;
    }
    if (palette !== null)
        return {
            "primary": palette.primary,
            "secondary": palette.secondary,
            "background": palette.background,
            "tertiary": palette.tertiary,
            "quaternary": palette.quaternary,
            "border": palette.border,
            "chevron": palette.chevron,
            "textTitle": palette.textTitle,
            "textPrimary": palette.textPrimary,
            "error": palette.error,
            "nav":palette.nav,
            "textLogin": palette.textLogin,
            "googleLogin": palette.googleLogin,
            "discordLogin": palette.discordLogin,
            "white":"#FFFFFF",
            "Expire": {
                "later": palette.secondary,
                "soon": "#FFC933",
                "today": "#DD595E",
            }
        }
    return {
        "primary": "#111111",
        "secondary": "#161616",
        "background": "#242424",
        "tertiary": "#595959",
        "quaternary": "#454545",
        "border": "#707070",
        "chevron": "white",
        "textTitle": "#D4D4D4",
        "textPrimary": "white",
        "error": "#F57575",
        "nav":"0,0,0",
        "textLogin": "white",
        "googleLogin": "#4285F4",
        "discordLogin": "#595959",
        "white":"#FFFFFF",
        "Expire": {
            "later": "#161616",
            "soon": "#DDCA3A",
            "today": "#DD595E",
        }
    }
}