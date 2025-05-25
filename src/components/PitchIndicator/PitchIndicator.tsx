import { PitchModel } from "@/Models/Pitch.model"
import { ColorSwatch, Text } from "@mantine/core"


interface PitchIndicatorProps {
    pitch: PitchModel
}

const colorForPitch = (pitch: PitchModel): string => {
    switch (pitch) {
        case '1': return '#B82D24'
        case '2': return '#FAEE52'
        case '3': return '#4190CF'
        default: return '#E4D6B0'
    }
}

const textColorForPitch = (pitch: PitchModel): string => {
    switch (pitch) {
        case '1': return '#fff'
        case '2': return '#000'
        case '3': return '#fff'
        default: return '#000'
    }
}

export function PitchIndicator({pitch}: PitchIndicatorProps) {
    

    return (
    <ColorSwatch
        color={colorForPitch(pitch)}
        style={{ color: textColorForPitch(pitch) }}
    >
      <Text fw="700">{pitch}</Text>
    </ColorSwatch>
    )
}