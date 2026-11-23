import styled from 'styled-components'
import heroImage from '../assets/dog-coffee-hero.jpg'
import { CoffeeCard } from '../components/CoffeeCard'
import { coffees } from '../data/coffees'

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 1rem 3rem;
  }
`

const Hero = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.brandYellow},
    ${({ theme }) => theme.colors.surfaceAlt}
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`

const HeroContent = styled.div`
  flex: 1 1 18rem;
  min-width: 0;
`

const HeroTitle = styled.h1`
  font-size: clamp(1.6rem, 5vw, 2.5rem);
  color: ${({ theme }) => theme.colors.textTitle};
`

const HeroText = styled.p`
  margin-top: 0.75rem;
  max-width: 34rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSubtitle};
`

const HeroImage = styled.img`
  display: block;
  flex: 0 1 12rem;
  width: min(100%, 12rem);
  aspect-ratio: 1;
  margin-inline: auto;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border};
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-basis: 15rem;
    width: min(100%, 15rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-basis: 17rem;
    width: min(100%, 17rem);
  }
`

const SectionTitle = styled.h2`
  margin: 2rem 0 1rem;
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textTitle};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export function Home() {
  return (
    <Page>
      <Hero>
        <HeroContent>
          <HeroTitle>Encontre o café perfeito para cada momento.</HeroTitle>
          <HeroText>
            Explore nosso catálogo, escolha a quantidade e monte seu pedido com entrega e
            pagamento simulados.
          </HeroText>
        </HeroContent>
        <HeroImage
          src={heroImage}
          alt="Filhote entregador do Coffee Delivery abraçando uma xícara de café fumegante"
        />
      </Hero>

      <SectionTitle>Nossos cafés</SectionTitle>

      <Grid>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </Grid>
    </Page>
  )
}
