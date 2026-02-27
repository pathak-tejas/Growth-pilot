import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: string;
}

export default function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">{icon || "🚀"}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6 max-w-md">{description}</p>
          <Button disabled>Coming Soon</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
