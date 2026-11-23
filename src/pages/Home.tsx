import styled from 'styled-components'
import heroImage from '../assets/hero-coffee.svg'
import { CoffeeCard } from '../components/CoffeeCard'
import { coffees } from '../data/coffees'

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
`

const Hero = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.surfaceAlt}
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`

const HeroContent = styled.div`
  flex: 1 1 18rem;
`

const HeroTitle = styled.h1`
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  color: ${({ theme }) => theme.colors.text};
`

const HeroText = styled.p`
  margin-top: 0.75rem;
  max-width: 34rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const HeroImage = styled.img`
  width: min(100%, 220px);
`

const SectionTitle = styled.h2`
  margin: 2.5rem 0 1rem;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;

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
            Explore nosso catálogo, escolha a quantidade e monte seu pedido. A finalização
            estará disponível nas próximas etapas.
          </HeroText>
        </HeroContent>
        <HeroImage src={heroImage} alt="" aria-hidden="true" />
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
