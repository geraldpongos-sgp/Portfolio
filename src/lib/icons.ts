import {
  Store,
  ShoppingBag,
  Package,
  ShoppingCart,
  Truck,
  Boxes,
  Repeat,
  Briefcase,
  Mail,
  Calendar,
  HardDrive,
  Video,
  Palette,
  Bot,
  Scissors,
  Clapperboard,
  Music2,
  Search,
} from "lucide-react";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export const toolIconMap: Record<string, IconComponent> = {
  Store,
  ShoppingBag,
  Package,
  ShoppingCart,
  Truck,
  Boxes,
  Repeat,
  Briefcase,
  Mail,
  Calendar,
  HardDrive,
  Video,
  Palette,
  Bot,
  Scissors,
  Clapperboard,
  Music2,
};

export const serviceIconMap: Record<string, IconComponent> = {
  ShoppingBag,
  Package,
  Search,
};

export const toolIconNames = Object.keys(toolIconMap);
export const serviceIconNames = Object.keys(serviceIconMap);
