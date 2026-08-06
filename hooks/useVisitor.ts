"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useVisitor() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const visited = sessionStorage.getItem("deskscape-visited");

    if (visited) {
      return;
    }

    const addVisitor = async () => {
      const { data, error } = await supabase.rpc("increment_visitor");

      if (!error && data) {
        setCount(data);
      }

      sessionStorage.setItem("deskscape-visited", "true");
    };

    addVisitor();
  }, []);

  return count;
}
