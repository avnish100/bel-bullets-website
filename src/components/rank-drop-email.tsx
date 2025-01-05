// RankDropEmail.tsx
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import { Tailwind } from '@react-email/tailwind';
  
  interface RankDropEmailProps {
    previewText?: string;
  }
  
  export default function RankDropEmail({
    previewText = "Someone's taken your spot! 👀",
  }: RankDropEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="mx-auto bg-[#f4f4f4] font-sans">
            <Container className="mx-auto max-w-[600px]">
              {/* Header */}
              <Section className="bg-black px-4 py-5 text-center">
                <Img
                src="https://www.belbullets.run/_next/image?url=%2Fbel-bullets-logo.png&w=256&q=75"
                  alt="Bel Bullets"
                  className="mx-auto"
                />
              </Section>
  
              {/* Content */}
              <Section className="bg-white px-4 py-8">
                {/* Alert Box */}
                <Container className="mb-6 rounded bg-[#ff6600] px-5 py-4 text-center">
                  <Heading className="m-0 text-xl font-bold text-white">
                    Yoooo! Someone Just Took Your Spot! 🏃‍♂️💨
                  </Heading>
                </Container>
  
                <Text className="text-base leading-6">
                  We noticed a bullet just took over you at the challenge and we thought we'd let you know . 
                  I wouldn't let it slide if I were you lil bro 🤷🏾‍♂️🤷🏾‍♂️
                </Text>
  
                <Button
                  href="https://belbullets.run"
                  className="mx-auto block rounded bg-[#ff6600] px-8 py-4 text-base font-bold uppercase text-white"
                >
                  See Who's Picking a Bone With Ya
                </Button>
              </Section>
  
              {/* Footer */}
              <Section className="bg-black px-4 py-5 text-center text-sm text-white">
                <Text className="m-0">
                  BelBullets | Never Run Alone
                </Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }