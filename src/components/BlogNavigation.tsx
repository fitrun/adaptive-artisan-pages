import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";

interface SubMenuItem {
  label: string;
  href: string;
  children?: SubMenuItem[];
}

interface MenuItem {
  label: string;
  href: string;
  children?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Nutrition",
    href: "/blog/nutrition",
    children: [
      { label: "Healthy Eating", href: "/blog/nutrition/healthy-eating" },
      { label: "Meal Planning", href: "/blog/nutrition/meal-planning" },
      { label: "Supplements", href: "/blog/nutrition/supplements" },
      { label: "Vitamins", href: "/blog/nutrition/vitamins" },
    ],
  },
  {
    label: "Diets",
    href: "/blog/diets",
    children: [
      { label: "Fasting", href: "/blog/diets/fasting" },
      { label: "Gluten Free", href: "/blog/diets/gluten-free" },
      {
        label: "Keto",
        href: "/blog/diets/keto",
        children: [
          {
            label: "Keto Recipes",
            href: "/blog/diets/keto/recipes",
            children: [
              { label: "Keto Breakfast", href: "/blog/diets/keto/recipes/breakfast" },
              { label: "Keto Lunch", href: "/blog/diets/keto/recipes/lunch" },
              { label: "Keto Dinner", href: "/blog/diets/keto/recipes/dinner" },
            ],
          },
          { label: "Keto Basics", href: "/blog/diets/keto/basics" },
          { label: "Keto Meal Plans", href: "/blog/diets/keto/meal-plans" },
        ],
      },
      { label: "Low Carb", href: "/blog/diets/low-carb" },
      { label: "Low Cholesterol", href: "/blog/diets/low-cholesterol" },
      { label: "Mediterranean", href: "/blog/diets/mediterranean" },
      { label: "Paleo", href: "/blog/diets/paleo" },
      { label: "Plant Based", href: "/blog/diets/plant-based" },
      { label: "Vegan", href: "/blog/diets/vegan" },
      { label: "Vegetarian", href: "/blog/diets/vegetarian" },
    ],
  },
  {
    label: "Fitness",
    href: "/blog/fitness",
    children: [
      { label: "Workouts", href: "/blog/fitness/workouts" },
      { label: "Strength Training", href: "/blog/fitness/strength-training" },
      { label: "Cardio", href: "/blog/fitness/cardio" },
      { label: "Yoga", href: "/blog/fitness/yoga" },
      { label: "Pilates", href: "/blog/fitness/pilates" },
    ],
  },
  {
    label: "Weight Loss",
    href: "/blog/weight-loss",
    children: [
      { label: "Tips & Tricks", href: "/blog/weight-loss/tips" },
      { label: "Success Stories", href: "/blog/weight-loss/success-stories" },
      { label: "Calorie Counting", href: "/blog/weight-loss/calorie-counting" },
    ],
  },
  {
    label: "Mental Health",
    href: "/blog/mental-health",
    children: [
      { label: "Meditation", href: "/blog/mental-health/meditation" },
      { label: "Stress Relief", href: "/blog/mental-health/stress-relief" },
      { label: "Sleep", href: "/blog/mental-health/sleep" },
      { label: "Mindfulness", href: "/blog/mental-health/mindfulness" },
    ],
  },
  {
    label: "Corporate Wellness",
    href: "/blog/corporate-wellness",
  },
];

interface SubMenuProps {
  items: SubMenuItem[];
  level?: number;
  isVisible?: boolean;
}

const SubMenu = ({ items, level = 1, isVisible = true }: SubMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      className={`absolute bg-background rounded-3xl py-3 min-w-[200px] z-50 transition-all duration-200 ease-out ${
        level === 1 ? "top-full left-0 mt-1" : "top-0 left-full ml-2"
      } ${
        isVisible 
          ? "opacity-100 translate-y-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
          : "opacity-0 translate-y-2 shadow-none pointer-events-none"
      }`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LocalizedLink
            to={item.href}
            className={`flex items-center justify-between px-5 py-2.5 text-sm text-foreground hover:text-muted-foreground transition-colors ${
              hoveredItem === item.label && item.children ? "text-muted-foreground" : ""
            }`}
          >
            <span>{item.label}</span>
            {item.children && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </LocalizedLink>
          
          {item.children && hoveredItem === item.label && (
            <SubMenu items={item.children} level={level + 1} isVisible={true} />
          )}
        </div>
      ))}
    </div>
  );
};

export const BlogNavigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-1 border-b border-border bg-background px-6 py-3">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-1">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors rounded-md ${
                hoveredItem === item.label ? "text-muted-foreground" : ""
              }`}
            >
              <span>{item.label}</span>
              {item.children && (
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    hoveredItem === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            
            {/* Invisible bridge to prevent gap between trigger and dropdown */}
            {item.children && hoveredItem === item.label && (
              <div className="absolute top-full left-0 h-2 w-full" />
            )}
            
            {item.children && (
              <SubMenu items={item.children} isVisible={hoveredItem === item.label} />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
