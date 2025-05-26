import { AspectRatio, Paper, Image, AspectRatioProps } from '@mantine/core'
import classes from './CardImage.module.css'
import { CardModel } from '@/Models/Card.model'

interface CardImageProps extends AspectRatioProps, Omit<React.BaseHTMLAttributes<HTMLDivElement>, keyof AspectRatioProps> {
  card: CardModel
  thickBorder?: boolean 
}

export function CardImage({card, thickBorder, ...other}: CardImageProps) {
  return (
    <AspectRatio ratio={25/35} mx="auto" {...other}>
    <Paper bg='gray' radius='md'>
    <Image
      src={card.image_url}
      fit='contain'
      className={
        [
          thickBorder ? classes.thickBorder : undefined,
          card.foiling == 'R'
          ? classes.rainbowBox
          : card.foiling == 'C'
          ? classes.coldBox
          : card.foiling == 'G'
          ? classes.goldBox
          : undefined
        ].join(' ')
      }
    />
    </Paper>
    </AspectRatio>
  )
}