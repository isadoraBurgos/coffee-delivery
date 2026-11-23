import type { Coffee } from '../types/coffee'
import cafeComLeite from '../assets/cafe-com-leite.svg'
import cafeIntenso from '../assets/cafe-intenso.svg'
import capuccino from '../assets/capuccino.svg'
import carameloGelado from '../assets/caramelo-gelado.svg'
import cubano from '../assets/cubano.svg'
import expressoAmericano from '../assets/expresso-americano.svg'
import expressoCremoso from '../assets/expresso-cremoso.svg'
import expressoGelado from '../assets/expresso-gelado.svg'
import expressoTradicional from '../assets/expresso-tradicional.svg'
import latte from '../assets/latte.svg'
import macchiato from '../assets/macchiato.svg'
import mocha from '../assets/mocha.svg'

/** Catálogo local tipado. Nenhuma imagem é remota: todos os SVGs são locais. */
export const coffees: Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos.',
    tags: ['Tradicional'],
    priceInCents: 990,
    image: expressoTradicional,
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional.',
    tags: ['Tradicional'],
    priceInCents: 990,
    image: expressoAmericano,
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso encorpado com uma camada de creme.',
    tags: ['Tradicional'],
    priceInCents: 1090,
    image: expressoCremoso,
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo.',
    tags: ['Tradicional', 'Gelado'],
    priceInCents: 1190,
    image: expressoGelado,
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Café e leite em proporções iguais, cremoso e suave.',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1090,
    image: cafeComLeite,
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Café expresso com muito leite e uma camada de espuma.',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1290,
    image: latte,
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Expresso marcado por um toque de leite espumado.',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1290,
    image: macchiato,
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Chocolate, leite e café expresso em uma combinação doce.',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1390,
    image: mocha,
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Café com leite e espuma cremosa polvilhada com canela.',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1390,
    image: capuccino,
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Expresso gelado com limão e açúcar, refrescante e forte.',
    tags: ['Tradicional', 'Gelado'],
    priceInCents: 1490,
    image: cubano,
  },
  {
    id: 'caramelo-gelado',
    name: 'Caramelo Gelado',
    description: 'Café gelado com calda de caramelo e leite cremoso.',
    tags: ['Gelado', 'Com leite'],
    priceInCents: 1590,
    image: carameloGelado,
  },
  {
    id: 'cafe-intenso',
    name: 'Café Intenso',
    description: 'Blend encorpado para quem prefere um sabor mais marcante.',
    tags: ['Tradicional'],
    priceInCents: 1190,
    image: cafeIntenso,
  },
]

/** Consulta rápida por id, usada pelo carrinho e pelo checkout. */
export const coffeeById = new Map(coffees.map((coffee) => [coffee.id, coffee]))
