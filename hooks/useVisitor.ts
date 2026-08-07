"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export function useVisitor() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const supabase = getSupabase();

        // Cek apakah browser/session ini sudah pernah dihitung
        const alreadyVisited =
          sessionStorage.getItem("deskscape-visited");

        // Ambil counter dari Supabase
        const { data, error: fetchError } = await supabase
          .from("visitor_counter")
          .select("count")
          .eq("id", 1)
          .single();

        if (fetchError) {
          console.error("VISITOR FETCH ERROR:", fetchError);
          return;
        }

        let count = data?.count ?? 0;

        // Hanya tambah sekali per session
        if (!alreadyVisited) {
          count += 1;

          const { error: updateError } = await supabase
            .from("visitor_counter")
            .update({ count })
            .eq("id", 1);

          if (updateError) {
            console.error("VISITOR UPDATE ERROR:", updateError);
            return;
          }

          sessionStorage.setItem("deskscape-visited", "true");
        }

        setVisitorCount(count);

        console.log("VISITOR COUNT:", count);
      } catch (error) {
        console.error("VISITOR ERROR:", error);
      }
    };

    trackVisitor();
  }, []);

  return visitorCount;
}