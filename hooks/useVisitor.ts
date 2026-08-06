"use client";

import { useEffect, useState } from "react";

import { getSupabase } from "@/lib/supabase";

export function useVisitor() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadVisitor = async () => {
      const supabase = getSupabase();

      const visited = sessionStorage.getItem("deskscape-visited");

      if (!visited) {
        await supabase.from("visitors").insert({
          page: "deskscape",
        });

        sessionStorage.setItem("deskscape-visited", "true");
      }

      const { data, error } = await supabase.from("visitors").select("id");

      if (!error && data) {
        setCount(data.length);
      }
    };

    loadVisitor();
  }, []);

  return count;
}
