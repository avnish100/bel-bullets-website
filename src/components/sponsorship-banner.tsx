import Image from "next/image"

interface Sponsor {
    name: string;
    logo: string;
    url: string;
}

export function SponsorshipBanner({ name, logo, url }: Sponsor) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full mb-4">
      <Image
        src={logo || "/bel-bullets-logo.png"}
        alt={`${name} logo`}
        layout="responsive"
        width={100}
        height={100}
        className="rounded-md w-full"
      />
    </a>
  )
}

