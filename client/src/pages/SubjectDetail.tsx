import { useParams } from "wouter";
import { getSubject, getAllSubjects } from "@/lib/subjectDatabase";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Link } from "wouter";
import { Play, ExternalLink } from "lucide-react";

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const subject = getSubject(id || "");
  const [selectedExamTopic, setSelectedExamTopic] = useState(0);

  if (!subject) {
    return (
      <div className="app-shell flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-400 mb-2">Subject Not Found</h1>
          <p className="text-muted-foreground mb-4">The subject you're looking for doesn't exist.</p>
          <Link href="/" className="text-orange-400 hover:text-orange-300 underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-orange-500/20 p-4 mb-4">
        <h1 className="text-2xl font-bold text-orange-300">{subject.name}</h1>
        <p className="text-xs text-muted-foreground mt-1">{subject.description}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="guide" className="px-4">
        <TabsList className="grid w-full grid-cols-5 gap-1 bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="guide" className="text-xs">Guide</TabsTrigger>
          <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
          <TabsTrigger value="lessons" className="text-xs">Lessons</TabsTrigger>
          <TabsTrigger value="exams" className="text-xs">Exams</TabsTrigger>
          <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
        </TabsList>

        {/* GUIDE TAB */}
        <TabsContent value="guide" className="space-y-4 mt-4">
          <div className="neon-card p-4 space-y-4">
            {/* Overview */}
            <div>
              <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-2">About This Subject</div>
              <p className="text-sm text-white/80">{subject.description}</p>
            </div>

            {/* Key Topics */}
            <div>
              <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-2">Topics Covered ({subject.lessons.length})</div>
              <ul className="space-y-1.5">
                {subject.lessons.slice(0, 8).map((lesson: any, i: number) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-emerald-400 flex-shrink-0">→</span>
                    <span>{lesson.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stats */}
            <div>
              <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-2">Resources Available</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                  <div className="text-orange-300 font-semibold">{subject.lessons.length}</div>
                  <div className="text-muted-foreground">Lessons</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                  <div className="text-orange-300 font-semibold">{subject.videos.length}</div>
                  <div className="text-muted-foreground">Videos</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                  <div className="text-orange-300 font-semibold">{subject.exams.length}</div>
                  <div className="text-muted-foreground">Exams</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                  <div className="text-orange-300 font-semibold">{subject.conceptNotes.length}</div>
                  <div className="text-muted-foreground">Notes</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* VIDEOS TAB (12 videos) */}
        <TabsContent value="videos" className="space-y-3 mt-4">
          <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">12 Video Resources</div>
          {subject.videos.length > 0 ? (
            subject.videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-card p-4 flex items-start justify-between hover:bg-white/5 transition-all duration-200 shadow-[0_4px_12px_rgba(255,106,26,0.15)] hover:shadow-[0_8px_24px_rgba(255,106,26,0.3)]"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <Play className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-sm">{video.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 ml-6">
                    <span>{video.channel}</span>
                    <span>•</span>
                    <span>{video.duration}</span>
                  </div>
                  <Badge variant="outline" className={`ml-6 text-xs ${
                    video.difficulty === "beginner"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : video.difficulty === "intermediate"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  }`}>
                    {video.difficulty}
                  </Badge>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
              </a>
            ))
          ) : (
            <div className="neon-card p-6 text-center text-muted-foreground">
              <p>No videos available yet</p>
            </div>
          )}
        </TabsContent>

        {/* LESSONS TAB - Full Interactive Lessons */}
        <TabsContent value="lessons" className="space-y-3 mt-4">
          <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">Interactive Lessons ({subject.lessons.length})</div>
          {subject.lessons.length > 0 ? (
            subject.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="neon-card p-4 hover:bg-white/5 transition-all duration-200 shadow-[0_4px_12px_rgba(255,106,26,0.15)] hover:shadow-[0_8px_24px_rgba(255,106,26,0.3)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-orange-300">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Topic: {lesson.topic}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white/5 rounded-lg p-3 mb-3 text-sm space-y-2 border border-white/10">
                  <p className="text-white/80 leading-relaxed">{lesson.content}</p>
                </div>

                {/* Key Points */}
                <div className="mb-3">
                  <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-1.5">Key Points</div>
                  <ul className="space-y-1 text-xs">
                    {lesson.keyPoints.map((point: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-white/70">
                        <span className="text-emerald-400 flex-shrink-0">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examples */}
                {lesson.examples.length > 0 && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2.5 text-xs">
                    <div className="text-orange-300 font-semibold mb-1">Examples:</div>
                    <ul className="space-y-1">
                      {lesson.examples.map((ex: string, idx: number) => (
                        <li key={idx} className="text-white/70 font-mono text-xs leading-relaxed">• {ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="neon-card p-6 text-center text-muted-foreground">
              <p>No lessons available yet</p>
            </div>
          )}
        </TabsContent>

        {/* EXAMS TAB (12 topics) */}
        <TabsContent value="exams" className="space-y-4 mt-4">
          <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">12 Exam Topics with Questions</div>

          {/* Topic selector */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {subject.exams.map((exam, idx) => (
              <button
                key={exam.id}
                onClick={() => setSelectedExamTopic(idx)}
                className={`p-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  selectedExamTopic === idx
                    ? "bg-orange-500/30 text-orange-300 border border-orange-500/50 shadow-[0_4px_12px_rgba(255,106,26,0.3)]"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                }`}
              >
                {exam.topic}
              </button>
            ))}
          </div>

          {/* Selected exam questions */}
          {subject.exams[selectedExamTopic] && (
            <div className="space-y-3">
              <div className="neon-card p-4 bg-orange-500/5 border border-orange-500/20 shadow-[0_4px_12px_rgba(255,106,26,0.2)]">
                <h3 className="font-semibold text-orange-300 mb-3">{subject.exams[selectedExamTopic].topic}</h3>
                {subject.exams[selectedExamTopic].questions.map((q, qIdx) => (
                  <div key={q.id} className="mb-4 pb-4 border-b border-white/10 last:border-0">
                    <p className="text-sm font-semibold mb-2">{qIdx + 1}. {q.question}</p>
                    <div className="space-y-1.5 mb-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className={`text-xs p-2 rounded ${
                          oIdx === q.correct
                            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                            : "bg-white/5 border border-white/10"
                        }`}>
                          <span className="font-mono">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic">Explanation: {q.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* TOOLS TAB */}
        <TabsContent value="tools" className="space-y-3 mt-4">
          <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">Recommended Study Tools</div>
          <div className="neon-card p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-orange-500/20">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Graphing & Visualization</h4>
                <p className="text-xs text-muted-foreground">Use Desmos, GeoGebra, Wolfram Alpha</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-orange-500/20">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Note Taking</h4>
                <p className="text-xs text-muted-foreground">Notion, OneNote, or pen & paper</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-orange-500/20">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-lg">⏱️</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Time Management</h4>
                <p className="text-xs text-muted-foreground">Pomodoro timer, Todoist, Trello</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Practice & Testing</h4>
                <p className="text-xs text-muted-foreground">Khan Academy, Quizlet, LeetCode</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Subjects */}
      <section className="mt-6 px-4 pb-4">
        <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">Other Subjects</div>
        <div className="grid grid-cols-2 gap-2">
          {getAllSubjects()
            .filter((s) => s.id !== subject.id)
            .slice(0, 4)
            .map((s) => (
              <Link
                key={s.id}
                href={`/subject/${s.id}`}
                className="neon-card p-3 text-center hover:bg-white/5 transition-all duration-200 shadow-[0_4px_12px_rgba(255,106,26,0.15)] hover:shadow-[0_8px_24px_rgba(255,106,26,0.3)]"
              >
                <div className="text-xs font-semibold">{s.name}</div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
