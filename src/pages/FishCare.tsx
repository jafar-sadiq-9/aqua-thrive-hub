import { Droplets, Thermometer, Fish, Sun, Heart, AlertTriangle } from "lucide-react";

const guides = [
  {
    icon: Thermometer,
    title: "Water Temperature",
    tips: [
      "Tropical fish: 75-82°F (24-28°C)",
      "Use a reliable heater with thermostat",
      "Avoid placing tank near windows or radiators",
      "Check temperature daily",
    ],
  },
  {
    icon: Droplets,
    title: "Water Quality",
    tips: [
      "Change 20-25% water weekly",
      "Test pH, ammonia, nitrite, nitrate regularly",
      "Use water conditioner to remove chlorine",
      "Cycle your tank before adding fish",
    ],
  },
  {
    icon: Fish,
    title: "Feeding",
    tips: [
      "Feed 2-3 times daily, only what they eat in 2 min",
      "Vary diet: flakes, pellets, frozen, live food",
      "Skip feeding one day per week",
      "Remove uneaten food promptly",
    ],
  },
  {
    icon: Sun,
    title: "Lighting",
    tips: [
      "8-10 hours of light per day",
      "Use a timer for consistency",
      "LED lights are energy efficient",
      "Too much light causes algae growth",
    ],
  },
  {
    icon: Heart,
    title: "Tank Mates",
    tips: [
      "Research compatibility before mixing species",
      "Don't overcrowd — 1 inch of fish per gallon",
      "Provide hiding spots and territories",
      "Quarantine new fish for 2 weeks",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Common Issues",
    tips: [
      "White spots = Ich disease — treat immediately",
      "Cloudy water = bacterial bloom — reduce feeding",
      "Gasping at surface = low oxygen — add airstone",
      "Faded colors = stress — check water parameters",
    ],
  },
];

const FishCare = () => (
  <div className="min-h-screen pt-24 pb-12">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
        <span className="gradient-text">Fish Care</span> Guide
      </h1>
      <p className="text-muted-foreground mb-10">Essential tips for keeping your fish healthy and happy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, i) => (
          <div key={guide.title} className="glass-card-hover p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <guide.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{guide.title}</h3>
            </div>
            <ul className="space-y-2">
              {guide.tips.map((tip) => (
                <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FishCare;
