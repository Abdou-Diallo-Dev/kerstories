// src/components/StoryPanel.tsx
"use client";

import EmptyState   from "./EmptyState";
import LoadingState from "./LoadingState";
import StoryDisplay from "./StoryDisplay";
import { Story }    from "@/lib/types";

interface StoryPanelProps {
  story:   Story | null;
  storyId?: string | null;
  loading: boolean;
  onNew:   () => void;
}

export default function StoryPanel({ story, storyId, loading, onNew }: StoryPanelProps) {
  return (
    <main
      className="flex-1 overflow-y-auto relative"
      style={{ background: "var(--cream)" }}
    >
      {loading && <LoadingState />}
      {!loading && !story && <EmptyState />}
      {!loading && story && <StoryDisplay story={story} storyId={storyId} onNew={onNew} />}
    </main>
  );
}
