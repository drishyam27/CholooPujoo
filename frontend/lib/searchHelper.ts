import { Pandal } from "./mockData";

/**
 * Calculates Sørensen-Dice similarity coefficient between two strings.
 * Returns a value between 0.0 (no similarity) and 1.0 (identical).
 */
export function getSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Calculate bigrams
  const getBigrams = (str: string) => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };
  
  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);
  
  if (bigrams1.size === 0 || bigrams2.size === 0) return 0;
  
  let intersection = 0;
  bigrams2.forEach((bg) => {
    if (bigrams1.has(bg)) {
      intersection++;
    }
  });
  
  return (2 * intersection) / (bigrams1.size + bigrams2.size);
}

/**
 * Filters a list of pandals based on direct and fuzzy spelling matching.
 * Sorts matching results by relevance score (highest similarity first).
 */
export function filterPandalsFuzzy(pandalsList: Pandal[], query: string): Pandal[] {
  const q = query.toLowerCase().trim();
  if (!q) return pandalsList;

  return pandalsList
    .map((pandal) => {
      const nameScore = getSimilarity(pandal.name, q);
      const locScore = getSimilarity(pandal.location, q);
      
      // Give direct substring matches an extra boost to keep them at the top
      const isExactName = pandal.name.toLowerCase().includes(q);
      const isExactLoc = pandal.location.toLowerCase().includes(q);
      
      let score = Math.max(nameScore, locScore);
      if (isExactName || isExactLoc) {
        score += 0.5; // Boost score for exact substring matches
      }
      
      return { pandal, score };
    })
    .filter((item) => {
      const hasExactSubstring = 
        item.pandal.name.toLowerCase().includes(q) || 
        item.pandal.location.toLowerCase().includes(q);
      
      // Match if there is a direct substring or the similarity is high enough
      return hasExactSubstring || item.score > 0.35;
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.pandal);
}
