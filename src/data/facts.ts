export const PORTFOLIO_FACTS = {
  academics: {
    cumulativeGpa: 3.76,
    gpaScale: 4,
  },
  portfolio: {
    documentedBuilds: 12,
  },
  innofashion: {
    competitionRegistrations: 302,
    competitionApproved: 284,
    eventParticipants: 212,
    eventCheckIns: [200, 30, 86],
  },
  tokokaret: {
    historicalCustomers: 4_000,
    historicalMarketplaceItems: 50_000,
  },
} as const;

export const FORMATTED_FACTS = {
  cumulativeGpa: PORTFOLIO_FACTS.academics.cumulativeGpa.toFixed(2),
  gpaScale: PORTFOLIO_FACTS.academics.gpaScale.toFixed(2),
} as const;
