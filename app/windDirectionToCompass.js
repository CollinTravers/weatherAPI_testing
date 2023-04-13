export function windDirectionToCompass(degrees){
    console.log(degrees)
    //a function that will take in degrees and return a compass reading
    const compassArray = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    
    //16 values, round to nearest int index value
    const index = Math.round(degrees / 22.5)

    return compassArray[index]
}