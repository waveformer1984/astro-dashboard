import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

export const formSchema = z.object({
  orgType: z.enum(["nonprofit", "forprofit", "education", "individual"]).default("individual"),
  location: z.string().min(2),
  amountNeeded: z.coerce.number().min(100),
  purpose: z.string().min(10),
  deadline: z.string().optional(),
  contactEmail: z.string().email(),
});

export const fundingSearchAction = defineAction({
  accept: "form",
  input: formSchema,
  async handler(input) {
    try {
      // Stub: In production, call curated sources/APIs and classify requirements.
      const mockResults = [
        {
          id: "grant-001",
          name: "Community Impact Microgrant",
          maxAmount: 5000,
          due: "2026-03-31",
          match: 0.78,
          link: "https://www.grants.gov/",
          requirements: ["501(c)(3) or fiscal sponsor", "1-page narrative", "budget"],
        },
        {
          id: "grant-002",
          name: "Innovation Seed Fund",
          maxAmount: 25000,
          due: "2026-06-15",
          match: 0.71,
          link: "https://www.sbir.gov/",
          requirements: ["For-profit eligibility", "pitch deck", "2 references"],
        },
      ];

      return { ok: true, results: mockResults };
    } catch (err: any) {
      throw new ActionError({ code: "BAD_REQUEST", message: err?.message || "Search failed" });
    }
  },
});
