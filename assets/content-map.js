// assets/content-map.js
// Site content sections, keyword tags, and a simple search filter function

const contentRegistry = {
  siteUrl: "https://play-bjlpoker.com",
  sections: [
    {
      id: "landing",
      title: "Welcome Zone",
      tags: ["home", "introduction", "百家乐", "quick play"],
      items: [
        { label: "Live Baccarat", link: "/live-baccarat", keywords: ["百家乐", "live dealer"] },
        { label: "VIP Tables", link: "/vip", keywords: ["high limit", "exclusive"] }
      ]
    },
    {
      id: "games",
      title: "Game Lobby",
      tags: ["cards", "table games", "百家乐", "slots"],
      items: [
        { label: "Baccarat Pro", link: "/games/baccarat-pro", keywords: ["百家乐", "strategy"] },
        { label: "Poker Challenge", link: "/games/poker", keywords: ["texas", "omaha"] },
        { label: "Dragon & Tiger", link: "/games/dragon-tiger", keywords: ["fast", "百家乐 variant"] }
      ]
    },
    {
      id: "promotions",
      title: "Bonuses & Rewards",
      tags: ["bonus", "cashback", "promo"],
      items: [
        { label: "Welcome Bonus", link: "/promo/welcome", keywords: ["deposit", "match"] },
        { label: "Baccarat Rebate", link: "/promo/baccarat-rebate", keywords: ["百家乐", "rebate"] }
      ]
    },
    {
      id: "support",
      title: "Help Center",
      tags: ["faq", "contact", "guide"],
      items: [
        { label: "Rules & How to Play", link: "/support/rules", keywords: ["百家乐", "tutorial"] },
        { label: "Live Chat", link: "/support/chat", keywords: ["24/7", "assistance"] }
      ]
    }
  ]
};

function searchContent(query, registry = contentRegistry) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const matchedSections = [];

  for (const section of registry.sections) {
    const sectionMatch = {
      sectionId: section.id,
      sectionTitle: section.title,
      matchedItems: []
    };

    for (const item of section.items) {
      const combined = [
        item.label,
        ...item.keywords,
        section.title,
        ...section.tags
      ].map(s => s.toLowerCase());

      const isMatch = combined.some(text => text.includes(lowerQuery));
      if (isMatch) {
        sectionMatch.matchedItems.push({
          label: item.label,
          link: item.link,
          matchedKeywords: item.keywords.filter(k => k.toLowerCase().includes(lowerQuery))
        });
      }
    }

    if (sectionMatch.matchedItems.length > 0) {
      matchedSections.push(sectionMatch);
    }
  }

  return matchedSections;
}

function getSectionById(sectionId, registry = contentRegistry) {
  return registry.sections.find(s => s.id === sectionId) || null;
}

function getAllKeywords(registry = contentRegistry) {
  const keywordSet = new Set();
  for (const section of registry.sections) {
    for (const tag of section.tags) keywordSet.add(tag);
    for (const item of section.items) {
      for (const kw of item.keywords) keywordSet.add(kw);
    }
  }
  return Array.from(keywordSet);
}

function filterByTags(tagList, registry = contentRegistry) {
  const lowerTags = tagList.map(t => t.toLowerCase());
  const results = [];

  for (const section of registry.sections) {
    const sectionLowerTags = section.tags.map(t => t.toLowerCase());
    const matchedTag = lowerTags.some(t => sectionLowerTags.includes(t));
    if (!matchedTag) continue;

    const filteredItems = section.items.filter(item => {
      const itemKeywords = item.keywords.map(k => k.toLowerCase());
      return lowerTags.some(t => itemKeywords.includes(t));
    });

    if (filteredItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        items: filteredItems
      });
    }
  }

  return results;
}

// Expose functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentRegistry,
    searchContent,
    getSectionById,
    getAllKeywords,
    filterByTags
  };
}