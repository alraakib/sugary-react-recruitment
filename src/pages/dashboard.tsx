import { MaterialCard, MaterialCardSkeleton } from "@/components/materialCard";
import { errorToast } from "@/components/toast";
import { authAxios } from "@/libs/auth";
import type { Material, MaterialsResponse } from "@/types/materials";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number>(1);
  const [materials, setMaterials] = useState<Material[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  type materialFilter = {
    Skip: number;
    Limit: number;
    Types: number[];
  };

  const [filter, setFilter] = useState<materialFilter>({
    Skip: 0,
    Limit: 20,
    Types: [1],
  });

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const encodedFilter = btoa(JSON.stringify(filter));
      const { data }: { data: MaterialsResponse } = await authAxios.get(
        `/Materials/GetAll?filter=${encodedFilter}`
      );
      setMaterials((prev) => [...prev, ...data.Materials]);
      setRemaining(data.RemainingCount);
    } catch (error) {
      console.error(error);
      toast.custom(errorToast("Failed to load materials"));
    }
    setLoading(false);
  }, [filter]);

  const materialRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && remaining > 0) {
            setFilter((prev) => ({
              ...prev,
              Skip: prev.Skip + prev.Limit,
            }));
          }
        },
        { threshold: 0.1, rootMargin: "-500px 0px 0px 0px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, remaining]
  );

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 container p-5 mx-auto">
      {materials.map((material: Material, index: number) => {
        const isLast = index === materials.length - 1;

        return (
          <MaterialCard
            key={index}
            material={material}
            ref={isLast ? materialRef : null}
          />
        );
      })}
      {loading &&
        Array.from({ length: 12 }).map((_: unknown, index: number) => {
          return <MaterialCardSkeleton key={index} />;
        })}
    </div>
  );
}
