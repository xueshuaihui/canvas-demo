export const zoomConfig = {
    min: 0.01,
    default: 1,
    max: 20
}
export const brushConfig = {
    minWidth: 1,
    maxWidth: 20
}
export const eraserConfig = {
    ...brushConfig,
}
export const stageConfig = {
    selection: false,
    backgroundColor: "#eee",
}