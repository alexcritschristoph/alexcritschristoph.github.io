"use client"

import { BookOpen, ExternalLink } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import Script from "next/script"

// Raw publication data from citations.csv with DOIs from CrossRef
const rawPublications = [
  { authors: "Crits-Christoph, Alexander; Robinson, Courtney K; Ma, Bing; Ravel, Jacques; Wierzchos, Jacek; Ascaso, Carmen; Artieda, Octavio; Souza-Egipsy, Virginia; Casero, M Cristina; DiRuggiero, Jocelyne;", tag: "Metagenomics", title: "Phylogenetic and functional substrate specificity for endolithic microbial communities in hyper-arid environments", journal: "Frontiers in Microbiology", year: 2016, doi: "10.3389/fmicb.2016.00301" },
  { authors: "Helmy, Mohamed; Crits-Christoph, Alexander; Bader, Gary D;", tag: "", title: "Ten simple rules for developing public biological databases", journal: "PLoS computational biology", year: 2016, doi: "10.1371/journal.pcbi.1005128" },
  { authors: "Robinson, Courtney K; Wierzchos, Jacek; Black, Celeste; Crits‐Christoph, Alexander; Ma, Bing; Ravel, Jacques; Ascaso, Carmen; Artieda, Octavio; Valea, Sergio; Roldán, Mònica;", tag: "Metagenomics", title: "Microbial diversity and the presence of algae in halite endolithic communities are correlated to atmospheric moisture in the hyper‐arid zone of the Atacama Desert", journal: "Environmental microbiology", year: 2015, doi: "10.1111/1462-2920.12364" },
  { authors: "Crits-Christoph, Alexander; Diamond, Spencer; Butterfield, Cristina N; Thomas, Brian C; Banfield, Jillian F;", tag: "Metagenomics", title: "Novel soil bacteria possess diverse genes for secondary metabolite biosynthesis", journal: "Nature", year: 2018, doi: "10.1038/s41586-018-0207-y" },
  { authors: "DiRuggiero, J; Wierzchos, J; Robinson, CK; Crits-Christoph, A; Ravel, J;", tag: "", title: "Rock Microhabitats from the Atacama Desert as Analogs for Mars Environments", journal: "Analog Sites for Mars Missions II", year: 2013, doi: "" },
  { authors: "Crits-Christoph, Alexander; Robinson, Courtney K; Barnum, Tyler; Fricke, W Florian; Davila, Alfonso F; Jedynak, Bruno; McKay, Christopher P; DiRuggiero, Jocelyne;", tag: "Metagenomics", title: "Colonization patterns of soil microbial communities in the Atacama Desert", journal: "Microbiome", year: 2013, doi: "10.1186/2049-2618-1-28" },
  { authors: "Crits‐Christoph, Alexander; Gelsinger, Diego R; Ma, Bing; Wierzchos, Jacek; Ravel, Jacques; Davila, Alfonso; Casero, M Cristina; DiRuggiero, Jocelyne;", tag: "Metagenomics", title: "Functional interactions of archaea, bacteria and viruses in a hypersaline endolithic community", journal: "Environmental microbiology", year: 2016, doi: "10.1111/1462-2920.13259" },
  { authors: "McCall, Matthew N; Baras, Alexander S; Crits-Christoph, Alexander; Ingersoll, Roxann; McAlexander, Melissa A; Witwer, Kenneth W; Halushka, Marc K;", tag: "", title: "A benchmark for microRNA quantification algorithms using the OpenArray platform", journal: "BMC bioinformatics", year: 2016, doi: "10.1186/s12859-016-0987-8" },
  { authors: "Berg, Maureen; Monnin, David; Cho, Juhyun; Nelson, Lydia; Crits-Christoph, Alexander; Shapira, Michael;", tag: "", title: "TGFβ/BMP immune signaling affects abundance and function of C. elegans gut commensals", journal: "Nature Communications", year: 2019, doi: "10.1038/s41467-019-08379-8" },
  { authors: "Olm, Matthew R; Bhattacharya, Nicholas; Crits-Christoph, Alexander; Firek, Brian A; Baker, Robyn; Song, Yun S; Morowitz, Michael J; Banfield, Jillian F;", tag: "Human microbiome", title: "Necrotizing enterocolitis is preceded by increased gut bacterial replication, Klebsiella, and fimbriae-encoding bacteria", journal: "Science advances", year: 2019, doi: "10.1126/sciadv.aax5727" },
  { authors: "Helmy, Mohamed; Crits-Christoph, Alexander; Wagih, Omar; Bader, Gary D;", tag: "", title: "DV-IMPACT: An online resource and data standard for reporting disease variants impact on domain-mediated protein interactions", journal: "F1000Research", year: 2016, doi: "10.7490/f1000research.1112228.1" },
  { authors: "Diamond, Spencer; Andeer, Peter F; Li, Zhou; Crits-Christoph, Alexander; Burstein, David; Anantharaman, Karthik; Lane, Katherine R; Thomas, Brian C; Pan, Chongle; Northen, Trent R;", tag: "Metagenomics", title: "Mediterranean grassland soil C–N compound turnover is dependent on rainfall and depth, and is mediated by genomically divergent microorganisms", journal: "Nature Microbiology", year: 2019, doi: "10.1038/s41564-019-0449-y" },
  { authors: "Olm, Matthew R; Crits-Christoph, Alexander; Diamond, Spencer; Lavy, Adi; Carnevali, Paula B Matheus; Banfield, Jillian F;", tag: "Metagenomics", title: "Consistent Metagenome-Derived Metrics Verify and Delineate Bacterial Species Boundaries", journal: "mSystems", year: 2020, doi: "10.1128/msystems.00731-19" },
  { authors: "Crits-Christoph, Alexander; Olm, Matthew R; Diamond, Spencer; Bouma-Gregson, Keith; Banfield, Jillian F;", tag: "Metagenomics", title: "Soil bacterial populations are shaped by recombination and gene-specific selection across a grassland meadow", journal: "The ISME journal", year: 2020, doi: "10.1038/s41396-020-0655-x" },
  { authors: "Steen, Andrew D; Crits-Christoph, Alexander; Carini, Paul; DeAngelis, Kristen M; Fierer, Noah; Lloyd, Karen G; Thrash, J Cameron;", tag: "Metagenomics", title: "High proportions of bacteria and archaea across most biomes remain uncultured", journal: "The ISME journal", year: 2019, doi: "10.1038/s41396-019-0484-y" },
  { authors: "Sharrar, Allison M; Crits-Christoph, Alexander; Méheust, Raphaël; Diamond, Spencer; Starr, Evan P; Banfield, Jillian F;", tag: "Metagenomics", title: "Bacterial secondary metabolite biosynthetic potential in soil varies with phylum, depth, and vegetation type", journal: "mBio", year: 2020, doi: "10.1128/mbio.00416-20" },
  { authors: "Li, Zhou; Yao, Quiming; Guo, Xuan; Crits-Christoph, Alexander; Mayes, Melanie A; Hervey, IV; Judson, William; Lebeis, Sarah L; Banfield, Jillian F; Hurst, Gregory B;", tag: "Metagenomics", title: "Genome-Resolved Proteomic Stable Isotope Probing of Soil Microbial Communities using 13CO2 and 13C-methanol", journal: "Frontiers in Microbiology", year: 2019, doi: "10.3389/fmicb.2019.02706" },
  { authors: "Ryan, FJ; Ahern, AM; Fitzgerald, RS; Laserna-Mendieta, EJ; Power, EM; Clooney, AG; O'Donoghue, KW; McMurdie, PJ; Iwai, S; Crits-Christoph, A;", tag: "Human microbiome", title: "Colonic microbiota is associated with inflammation and host epigenomic alterations in inflammatory bowel disease", journal: "Nature Communications", year: 2020, doi: "10.1038/s41467-020-15342-5" },
  { authors: "Matheus Carnevali, Paula B; Lavy, Adi; Thomas, Alex D; Crits-Christoph, Alexander; Diamond, Spencer; Méheust, Raphaël; Olm, Matthew R; Sharrar, Allison; Lei, Shufei; Dong, Wenming;", tag: "Metagenomics", title: "Meanders as a scaling motif for understanding of floodplain soil microbiome and biogeochemical potential at the watershed scale", journal: "Microbiome", year: 2021, doi: "10.1186/s40168-020-00957-z" },
  { authors: "Crits-Christoph, Alexander; Bhattacharya, Nicholas; Olm, Matthew R; Song, Yun S; Banfield, Jillian F;", tag: "Machine learning", title: "Transporter genes in biosynthetic gene clusters predict metabolite characteristics and siderophore activity", journal: "Genome Research", year: 2021, doi: "10.1101/gr.268169.120" },
  { authors: "Crits-Christoph, Alexander; Kantor, Rose S; Olm, Matthew R; Whitney, Oscar N; Al-Shayeb, Basem; Lou, Yue Clare; Flamholz, Avi; Kennedy, Lauren C; Greenwald, Hannah; Hinkle, Adrian;", tag: "Virology", title: "Genome sequencing of sewage detects regionally prevalent SARS-CoV-2 variants", journal: "MBio", year: 2021, doi: "10.1128/mBio.02703-20" },
  { authors: "Whitney, Oscar N; Kennedy, Lauren C; Fan, Vinson B; Hinkle, Adrian; Kantor, Rose; Greenwald, Hannah; Crits-Christoph, Alexander; Al-Shayeb, Basem; Chaplin, Mira; Maurer, Anna C;", tag: "Virology", title: "Sewage, Salt, Silica, and SARS-CoV-2 (4S): An Economical Kit-Free Method for Direct Capture of SARS-CoV-2 RNA from Wastewater", journal: "Environmental science & technology", year: 2021, doi: "10.1021/acs.est.0c08129" },
  { authors: "Lin-Xing Chen, Raphael Meheust, Alexander Crits-Christoph, Katherine D McMahon, Tara Colenbrander Nelson, Lesley A Warren, Jillian F. Banfield;", tag: "Metagenomics", title: "Large Freshwater Phages with the Potential to Augment Aerobic Methane Oxidation", journal: "Nature Microbiology", year: 2020, doi: "10.1038/s41564-020-0779-9" },
  { authors: "Olm, Matthew R; Crits-Christoph, Alexander; Bouma-Gregson, Keith; Firek, Brian A; Morowitz, Michael J; Banfield, Jillian F;", tag: "Metagenomics", title: "inStrain profiles population microdiversity from metagenomic data and sensitively detects shared microbial strains", journal: "Nature Biotechnology", year: 2021, doi: "10.1038/s41587-020-00797-0" },
  { authors: "Crits-Christoph, Alexander; Diamond, Spencer; Al-Shayeb, Basem; Valentin-Alvarado, Luis; Banfield, Jillian F;", tag: "Metagenomics", title: "A widely distributed genus of soil Acidobacteria genomically enriched in biosynthetic gene clusters", journal: "ISME Communications", year: 2022, doi: "10.1038/s43705-022-00140-5" },
  { authors: "Greenwald, Hannah D; Kennedy, Lauren C; Hinkle, Adrian; Whitney, Oscar N; Fan, Vinson B; Crits-Christoph, Alexander; Harris-Lovett, Sasha; Flamholz, Avi I; Al-Shayeb, Basem; Liao, Lauren D;", tag: "Virology", title: "Tools for interpretation of wastewater SARS-CoV-2 temporal and spatial trends demonstrated with data collected in the San Francisco Bay Area", journal: "Water Research X", year: 2021, doi: "10.1016/j.wroa.2021.100111" },
  { authors: "Holmes, Edward C; Goldstein, Stephen A; Rasmussen, Angela L; Robertson, David L; Crits-Christoph, Alexander; Wertheim, Joel O; Anthony, Simon J; Barclay, Wendy S; Boni, Maciej F; Doherty, Peter C;", tag: "Virology", title: "The origins of SARS-CoV-2: A critical review", journal: "Cell", year: 2021, doi: "10.1016/j.cell.2021.08.017" },
  { authors: "Debray, Reena; Herbert, Robin A; Jaffe, Alexander L; Crits-Christoph, Alexander; Power, Mary E; Koskella, Britt;", tag: "", title: "Priority effects in microbiome assembly", journal: "Nature Reviews Microbiology", year: 2022, doi: "10.1038/s41579-021-00604-w" },
  { authors: "Lou, Yue Clare; Olm, Matthew R; Diamond, Spencer; Crits-Christoph, Alexander; Firek, Brian A; Baker, Robyn; Morowitz, Michael J; Banfield, Jillian F;", tag: "Human microbiome", title: "Infant gut strain persistence is associated with maternal origin, phylogeny, and traits including surface adhesion and iron acquisition", journal: "Cell Reports Medicine", year: 2021, doi: "10.1016/j.xcrm.2021.100393" },
  { authors: "Bouma‐Gregson, Keith; Crits‐Christoph, Alexander; Olm, Mathew R; Power, Mary E; Banfield, Jillian F;", tag: "Metagenomics", title: "Microcoleus (Cyanobacteria) form watershed‐wide populations without strong gradients in population structure", journal: "Molecular Ecology", year: 2022, doi: "10.1111/mec.16208" },
  { authors: "Rubin, Benjamin E; Diamond, Spencer; Cress, Brady F; Crits-Christoph, Alexander; Lou, Yue Clare; Borges, Adair L; Shivram, Haridha; He, Christine; Xu, Michael; Zhou, Zeyi;", tag: "Synthetic biology", title: "Species-and site-specific genome editing in complex bacterial communities", journal: "Nature Microbiology", year: 2021, doi: "10.1038/s41564-021-01014-7" },
  { authors: "Diamond, Spencer; Lavy, Adi; Crits-Christoph, Alexander; Matheus Carnevali, Paula B; Sharrar, Allison; Williams, Kenneth H; Banfield, Jillian F;", tag: "Metagenomics", title: "Soils and sediments host Thermoplasmata archaea encoding novel copper membrane monooxygenases (CuMMOs)", journal: "The ISME Journal", year: 2022, doi: "10.1038/s41396-021-01177-5" },
  { authors: "Crits-Christoph, Alexander; Hallowell, Haley Anne; Koutouvalis, Kalia; Suez, Jotham;", tag: "Human microbiome", title: "Good microbes, bad genes? The dissemination of antimicrobial resistance in the human microbiome", journal: "Gut Microbes", year: 2022, doi: "10.1080/19490976.2022.2055944" },
  { authors: "Harrington, Valerie; Lau, Lilian; Crits-Christoph, Alexander; Suez, Jotham;", tag: "Human microbiome", title: "Interactions of Non-Nutritive Artificial Sweeteners with the Microbiome in Metabolic Syndrome", journal: "Immunometabolism", year: 2022, doi: "10.20900/immunometab20220012" },
  { authors: "Crits-Christoph, Alexander; Suez, Jotham;", tag: "Human microbiome", title: "Gut bacteria go on record", journal: "Nature Reviews Gastroenterology & Hepatology", year: 2022, doi: "10.1038/s41575-022-00653-3" },
  { authors: "Pekar, Jonathan E; Magee, Andrew; Parker, Edyth; Moshiri, Niema; Izhikevich, Katherine; Havens, Jennifer L; Gangavarapu, Karthik; Malpica Serrano, Lorena Mariana; Crits-Christoph, Alexander; Matteson, Nathaniel L;", tag: "Virology", title: "The molecular epidemiology of multiple zoonotic origins of SARS-CoV-2", journal: "Science", year: 2022, doi: "10.1126/science.abp8337" },
  { authors: "Worobey, Michael; Levy, Joshua I; Malpica Serrano, Lorena; Crits-Christoph, Alexander; Pekar, Jonathan E; Goldstein, Stephen A; Rasmussen, Angela L; Kraemer, Moritz UG; Newman, Chris; Koopmans, Marion PG;", tag: "Virology", title: "The Huanan Seafood Wholesale Market in Wuhan was the early epicenter of the COVID-19 pandemic", journal: "Science", year: 2022, doi: "10.1126/science.abp8715" },
  { authors: "Al-Shayeb, Basem; Schoelmerich, Marie C; West-Roberts, Jacob; Valentin-Alvarado, Luis E; Sachdeva, Rohan; Mullen, Susan; Crits-Christoph, Alexander; Wilkins, Michael J; Williams, Kenneth H; Doudna, Jennifer A;", tag: "Metagenomics", title: "Borgs are giant genetic elements with potential to expand metabolic capacity", journal: "Nature", year: 2022, doi: "10.1038/s41586-022-05256-1" },
  { authors: "Gilbert, Charlie; Brumwell, Stephanie L; Crits-Christoph, Alexander; Kang, Shinyoung Clair; Martin-Moldes, Zaira; Alsharif, Wajd; Esmurria, Ariela; Nguyen, Mary-Anne; Lee, Henry H; Ostrov, Nili;", tag: "Synthetic biology", title: "A scalable framework for high-throughput identification of functional origins of replication in non-model bacteria", journal: "bioRxiv", year: 2023, doi: "10.1101/2023.05.19.541510" },
  { authors: "Crits-Christoph, Alexander; Kang, Shinyoung Clair; Lee, Henry H; Ostrov, Nili;", tag: "Synthetic biology", title: "MicrobeMod: A computational toolkit for identifying prokaryotic methylation and restriction-modification with nanopore sequencing", journal: "bioRxiv", year: 2023, doi: "10.1101/2023.11.13.566931" },
  { authors: "Valentin-Alvarado, Luis E; Appler, Kathryn E; De Anda, Valerie; Schoelmerich, Marie C; West-Roberts, Jacob; Kivenson, Veronika; Crits-Christoph, Alexander; Ly, Lynn; Sachdeva, Rohan; Greening, Chris;", tag: "Metagenomics", title: "Asgard archaea modulate potential methanogenesis substrates in wetland soil", journal: "Nature Communications", year: 2024, doi: "10.1038/s41467-024-49872-z" },
  { authors: "Gilbert, Charlie; Crits-Christoph, Alexander; Ledieu-Dherbécourt, Elise; Kang, Shinyoung Clair; Brumwell, Stephanie L; Lee, Henry H; Ostrov, Nili;", tag: "Synthetic biology", title: "Design and construction towards a pan-microbial toolkit", journal: "bioRxiv", year: 2024, doi: "10.1101/2024.02.23.581749" },
  { authors: "Barnum, Tyler P; Crits-Christoph, Alexander; Molla, Michael; Carini, Paul; Lee, Henry H; Ostrov, Nili;", tag: "Synthetic biology", title: "Predicting microbial growth conditions from amino acid composition", journal: "bioRxiv", year: 2024, doi: "10.1101/2024.03.22.586313" },
  { authors: "Crits-Christoph, Alexander; Levy, Joshua I; Pekar, Jonathan E; Goldstein, Stephen A; Singh, Reema; Hensel, Zach; Gangavarapu, Karthik; Rogers, Matthew B; Moshiri, Niema; Garry, Robert F;", tag: "Virology", title: "Genetic tracing of market wildlife and viruses at the epicenter of the COVID-19 pandemic", journal: "Cell", year: 2024, doi: "10.1016/j.cell.2024.08.010" },
  { authors: "Valentin-Alvarado, Luis E; Shi, Ling-Dong; Appler, Kathryn E; Crits-Christoph, Alexander; De Anda, Valerie; Adler, Benjamin A; Cui, Michael L; Ly, Lynn; Leão, Pedro; Roberts, Richard J;", tag: "Metagenomics", title: "Complete genomes of Asgard archaea reveal diverse integrated and mobile genetic elements", journal: "Genome Research", year: 2024, doi: "10.1101/gr.279480.124" },
  { authors: "Parry, Rhys H; Lytras, Spyros; Petrone, Mary E; Wille, Michelle; Crits-Christoph, Alexander; Gifford, Robert J; Saito, Akatsuki; Smura, Teemu; Peacock, Thomas P;", tag: "Virology", title: "No evidence that mutations in SARS-CoV-2 variants of concern derive from homologous fragments in gut microbiota", journal: "Journal of Virology", year: 2024, doi: "10.1128/jvi.01468-24" },
  { authors: "Pekar, Jonathan E; Moshiri, Niema; Lemey, Philippe; Crits-Christoph, Alexander; Débarre, Florence; Goldstein, Stephen A; Hensel, Zach; Rambaut, Andrew; Worobey, Michael; Holmes, Edward C;", tag: "Virology", title: "Recently reported SARS-CoV-2 genomes suggested to be intermediate between the two early main lineages are instead likely derived", journal: "Virus Evolution", year: 2025, doi: "10.1093/ve/veaf008" },
  { authors: "Brumwell, Stephanie L; Esmurria, Ariela; Crits-Christoph, Alexander; Kang, Shinyoung Clair; Gilbert, Charlie; Lee, Henry H; Ostrov, Nili;", tag: "Synthetic biology", title: "A reference set of functional plasmids for Vibrio natriegens", journal: "bioRxiv", year: 2025, doi: "10.1101/2025.08.27.672616" },
  { authors: "Crits-Christoph, Alexander*; Leung, Julia*; Piedra, Felipe-Andrés; Brumwell, Stephanie L; Sajtovich, Victoria A; Abrams, Melanie B; Esmurria, Ariela; Kang, Shinyoung Clair; Mendler, Kerrin; Gilbert, Charlie;", tag: "Synthetic biology", title: "Functional genomics in a microbe that degrades and metabolizes PET plastic", journal: "bioRxiv", year: 2025, doi: "10.1101/2025.11.11.687616" },
  { authors: "Brumwell, Stephanie L; Lord, Allison; Corts, Anna D; Harken, Sierra; Crits-Christoph, Alexander; Nguyen, Mary-Anne; Leung, Julia; Mendler, Kerrin; Esmurria, Ariela; Gilbert, Charlie;", tag: "Machine learning", title: "Active learning guides automated discovery of DNA delivery via electroporation for non-model microbes", journal: "bioRxiv", year: 2025, doi: "10.1101/2025.11.18.689155" },
  { authors: "Ortiz, Luis; Esmurria, Ariela; Gilbert, Charlie; Crits-Christoph, Alexander; Barnum, Tyler P; Mancuso, Christopher P; Kang, Shinyoung Clair; Leung, Julia; Fenn, Kathrin; Abrams, Melanie B;", tag: "Synthetic biology", title: "A genetic platform for a biocementation bacterium", journal: "bioRxiv", year: 2025, doi: "10.64898/2025.12.05.692644" },
  { authors: "Gilbert, Charlie*; Leung, Julia*; Crits-Christoph, Alexander*; Kang, Shinyoung Clair; Esmurria, Ariela; Fenn, Kathrin; Brumwell, Stephanie L; Martin-Moldes, Zaira; Mendler, Kerrin; Barnum, Tyler P;", tag: "Synthetic biology", title: "A scalable transposon mutagenesis system for non-model bacteria", journal: "bioRxiv", year: 2025, doi: "10.64898/2025.12.22.696024" },
]

type Category = "all" | "first-author" | "metagenomics" | "synthetic-biology" | "human-microbiome" | "virology" | "machine-learning"

const categories: { label: string; value: Category }[] = [
  { label: "First Author", value: "first-author" },
  { label: "All", value: "all" },
  { label: "Metagenomics", value: "metagenomics" },
  { label: "Synthetic Biology", value: "synthetic-biology" },
  { label: "Human Microbiome", value: "human-microbiome" },
  { label: "Virology", value: "virology" },
  { label: "Machine Learning", value: "machine-learning" },
]

// Helper to check if first author (including co-first authorship indicated by asterisk)
function isFirstAuthor(authors: string): boolean {
  const normalized = authors.toLowerCase().replace(/[‐‑–—−]/g, '-')
  // Check if listed first
  if (normalized.startsWith("crits-christoph") || normalized.startsWith("crits christoph")) {
    return true
  }
  // Check for co-first authorship (asterisk indicates equal contribution)
  if (/crits-christoph,?\s*alexander\*/.test(normalized)) {
    return true
  }
  return false
}

// Helper to bold the author name
function formatAuthors(authors: string): JSX.Element {
  // Match variations of the name (including with asterisk for co-first authorship)
  const patterns = [
    /Crits-Christoph,?\s*Alexander\*?/gi,
    /Crits‐Christoph,?\s*Alexander\*?/gi,
    /Crits‑Christoph,?\s*Alexander\*?/gi,
    /Alexander\s*Crits-Christoph\*?/gi,
    /Crits-Christoph,?\s*A\b/gi,
    /Crits-Christoph,?\s*Alex\b/gi,
  ]
  
  let result = authors
  for (const pattern of patterns) {
    result = result.replace(pattern, (match) => `<BOLD>${match}</BOLD>`)
  }
  
  // Split by our marker and create elements
  const parts = result.split(/<BOLD>|<\/BOLD>/)
  return (
    <>
      {parts.map((part, i) => 
        i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : <span key={i}>{part}</span>
      )}
    </>
  )
}

// Map tag to category
function tagToCategory(tag: string): Category | null {
  const tagLower = tag.toLowerCase().trim()
  if (tagLower === "metagenomics") return "metagenomics"
  if (tagLower === "machine learning") return "machine-learning"
  if (tagLower === "virology") return "virology"
  if (tagLower === "synthetic biology") return "synthetic-biology"
  if (tagLower === "human microbiome") return "human-microbiome"
  return null
}

export function PublicationsSection() {
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState<Category>("first-author")
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [filterKey, setFilterKey] = useState(0)
  const badgesInitialized = useRef(false)

  const publications = useMemo(() => {
    return rawPublications
      .map((pub) => ({
        ...pub,
        firstAuthor: isFirstAuthor(pub.authors),
        category: tagToCategory(pub.tag),
        url: pub.doi ? `https://doi.org/${pub.doi}` : null,
      }))
      .sort((a, b) => b.year - a.year)
  }, [])

  const filtered = useMemo(() => {
    if (activeFilter === "all") return publications
    if (activeFilter === "first-author") return publications.filter((p) => p.firstAuthor)
    return publications.filter((p) => p.category === activeFilter)
  }, [activeFilter, publications])

  const displayed = showAll ? filtered : filtered.slice(0, 5)

  // Initialize badges once when scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded || badgesInitialized.current) return
    
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        if ((window as any).__dimensions_embed) {
          (window as any).__dimensions_embed.addBadges()
        }
        if ((window as any)._altmetric_embed_init) {
          (window as any)._altmetric_embed_init()
        }
        badgesInitialized.current = true
      }
    }, 200)
    
    return () => clearTimeout(timer)
  }, [scriptsLoaded])

  // Re-initialize badges when displayed publications change
  useEffect(() => {
    if (!badgesInitialized.current) return
    
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        if ((window as any).__dimensions_embed) {
          (window as any).__dimensions_embed.addBadges()
        }
        if ((window as any)._altmetric_embed_init) {
          (window as any)._altmetric_embed_init()
        }
      }
    }, 50)
    
    return () => clearTimeout(timer)
  }, [displayed, showAll, activeFilter])

  return (
    <section id="publications" className="relative py-8 md:py-12">
      {/* Load badge scripts */}
      <Script 
        src="https://badge.dimensions.ai/badge.js" 
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded(true)}
      />
      <Script 
        src="https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js" 
        strategy="afterInteractive"
      />
      
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Scientific Publications
            </h2>
            <p className="font-mono text-xs text-muted-foreground">
              // {publications.length} papers
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setActiveFilter(cat.value)
                setShowAll(false)
                setFilterKey(k => k + 1)
              }}
              className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3" key={filterKey}>
          {displayed.map((pub, idx) => {
            const content = (
              <>
                {/* Year badge and citation badges */}
                <div className="flex flex-shrink-0 flex-col items-center gap-2">
                  <span className="inline-block rounded-md border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
                    {pub.year}
                  </span>
                  {/* Citation badges */}
                  {pub.doi && (
                    <div className="flex items-center gap-1">
                      <span 
                        className="__dimensions_badge_embed__" 
                        data-doi={pub.doi}
                        data-style="small_circle"
                        data-hide-zero-citations="true"
                      />
                      <div 
                        className="altmetric-embed" 
                        data-badge-type="donut" 
                        data-doi={pub.doi}
                        data-hide-no-mentions="true"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {pub.title}
                    {pub.url && (
                      <ExternalLink className="ml-1.5 inline-block h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
                    )}
                  </h3>
                  <p className="mb-1 text-sm leading-relaxed text-muted-foreground">
                    {formatAuthors(pub.authors)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-medium italic text-foreground">
                      {pub.journal === "bioRxiv" ? "bioRxiv (preprint)" : pub.journal}
                    </span>
                    {pub.tag && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {pub.tag}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )

            return pub.url ? (
              <a
                key={idx}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-start sm:gap-5"
              >
                {content}
              </a>
            ) : (
              <div
                key={idx}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-all sm:flex-row sm:items-start sm:gap-5"
              >
                {content}
              </div>
            )
          })}
        </div>

        {filtered.length > 5 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              {showAll
                ? "Show fewer"
                : `Show all ${filtered.length} publications`}
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <a
            href="https://scholar.google.com/citations?user=YOUR_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {"View full list on Google Scholar ->"}
          </a>
        </div>
      </div>
    </section>
  )
}
