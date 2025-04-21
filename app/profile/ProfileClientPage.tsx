"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartBars,
  ChartBar,
  ChartHeader,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart"
import { Trophy, Brain, Clock, Target, Award, Calendar, Settings } from "lucide-react"

// Mock user data
const userData = {
  name: "Alex Johnson",
  username: "alexj",
  avatar: "/placeholder.svg?height=100&width=100",
  level: 24,
  xp: 2450,
  xpToNextLevel: 3000,
  quizzesTaken: 87,
  averageScore: 78,
  totalPoints: 24680,
  badges: [
    { id: 1, name: "Quiz Master", description: "Complete 50 quizzes", icon: Brain, earned: true },
    {
      id: 2,
      name: "Speed Demon",
      description: "Answer 20 questions in under 5 seconds each",
      icon: Clock,
      earned: true,
    },
    { id: 3, name: "Perfect Score", description: "Get 100% on 10 different quizzes", icon: Target, earned: true },
    { id: 4, name: "Science Whiz", description: "Complete all Science quizzes", icon: Brain, earned: false },
    { id: 5, name: "History Buff", description: "Complete all History quizzes", icon: Clock, earned: false },
    { id: 6, name: "Entertainment Guru", description: "Complete all Entertainment quizzes", icon: Award, earned: true },
  ],
  recentActivity: [
    { id: 1, type: "quiz", category: "Science & Technology", score: 850, date: "2 hours ago", result: "8/10" },
    { id: 2, type: "badge", name: "Speed Demon", date: "1 day ago" },
    { id: 3, type: "quiz", category: "History & Culture", score: 720, date: "2 days ago", result: "7/10" },
    { id: 4, type: "level", level: 24, date: "3 days ago" },
    { id: 5, type: "quiz", category: "Entertainment", score: 950, date: "5 days ago", result: "9/10" },
  ],
  categoryPerformance: [
    { category: "Science", correct: 85, incorrect: 15 },
    { category: "History", correct: 72, incorrect: 28 },
    { category: "Entertainment", correct: 90, incorrect: 10 },
    { category: "Geography", correct: 68, incorrect: 32 },
    { category: "Literature", correct: 75, incorrect: 25 },
  ],
  monthlyActivity: [
    { month: "Jan", quizzes: 12 },
    { month: "Feb", quizzes: 8 },
    { month: "Mar", quizzes: 15 },
    { month: "Apr", quizzes: 10 },
    { month: "May", quizzes: 14 },
    { month: "Jun", quizzes: 18 },
    { month: "Jul", quizzes: 22 },
    { month: "Aug", quizzes: 16 },
    { month: "Sep", quizzes: 20 },
    { month: "Oct", quizzes: 25 },
    { month: "Nov", quizzes: 30 },
    { month: "Dec", quizzes: 18 },
  ],
}

export default function ProfileClientPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">@{userData.username}</p>

                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      Level {userData.level}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {userData.quizzesTaken} Quizzes
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {userData.badges.filter((b) => b.earned).length} Badges
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{userData.totalPoints.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Points</div>
                  </div>

                  <Button className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">
                    Level Progress: {userData.xp}/{userData.xpToNextLevel} XP
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round((userData.xp / userData.xpToNextLevel) * 100)}%
                  </div>
                </div>
                <Progress value={(userData.xp / userData.xpToNextLevel) * 100} className="h-2 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-30 animate-pulse-slow"></div>
                </Progress>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest quiz results and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.recentActivity.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 animate-fade-in hover-lift"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                            {activity.type === "quiz" && (
                              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            )}
                            {activity.type === "badge" && (
                              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            )}
                            {activity.type === "level" && (
                              <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  {activity.type === "quiz" && `Completed ${activity.category} Quiz`}
                                  {activity.type === "badge" && `Earned ${activity.name} Badge`}
                                  {activity.type === "level" && `Reached Level ${activity.level}`}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                              </div>
                              {activity.type === "quiz" && (
                                <div className="text-right">
                                  <p className="font-bold transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                    {activity.score} points
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.result} correct</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Top Badges</CardTitle>
                    <CardDescription>Achievements you've unlocked</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.badges
                        .filter((badge) => badge.earned)
                        .slice(0, 3)
                        .map((badge) => (
                          <div
                            key={badge.id}
                            className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                              badge.earned
                                ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-md hover-lift"
                                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-80"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                badge.earned
                                  ? "bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200"
                                  : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <badge.icon
                                className={`w-6 h-6 transition-transform duration-300 ${
                                  badge.earned
                                    ? "text-purple-600 dark:text-purple-400 group-hover:scale-125"
                                    : "text-gray-400 dark:text-gray-500"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{badge.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("badges")}>
                      View All Badges
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6">
                <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>How well you're doing in different quiz categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer className="aspect-[4/3] sm:aspect-[2/1]">
                      <ChartHeader>
                        <ChartTitle>Correct vs. Incorrect Answers</ChartTitle>
                        <ChartLegend
                          categories={[
                            { name: "Correct", color: "bg-purple-500" },
                            { name: "Incorrect", color: "bg-red-400" },
                          ]}
                        />
                      </ChartHeader>
                      <ChartBars
                        data={userData.categoryPerformance}
                        xAxis={(d) => d.category}
                        yAxis={(d) => 100}
                        categories={[
                          { name: "correct", getValue: (d) => d.correct, color: "var(--chart-purple-500)" },
                          { name: "incorrect", getValue: (d) => d.incorrect, color: "var(--chart-red-400)" },
                        ]}
                      >
                        <ChartBar />
                      </ChartBars>
                      <ChartTooltip />
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="mt-6">
              <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Badges</CardTitle>
                  <CardDescription>Achievements and milestones you've reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                          badge.earned
                            ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-md hover-lift"
                            : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-80"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            badge.earned
                              ? "bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <badge.icon
                            className={`w-6 h-6 transition-transform duration-300 ${
                              badge.earned
                                ? "text-purple-600 dark:text-purple-400 group-hover:scale-125"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                          {!badge.earned && (
                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Not yet earned</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quiz Statistics</CardTitle>
                    <CardDescription>Your overall quiz performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-md hover-lift">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quizzes Taken</div>
                        <div className="text-3xl font-bold">{userData.quizzesTaken}</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-md hover-lift">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Score</div>
                        <div className="text-3xl font-bold">{userData.averageScore}%</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:shadow-md hover-lift">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Points</div>
                        <div className="text-3xl font-bold">{userData.totalPoints.toLocaleString()}</div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 transition-all duration-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:shadow-md hover-lift">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Perfect Scores</div>
                        <div className="text-3xl font-bold">12</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Monthly Activity</CardTitle>
                    <CardDescription>Number of quizzes taken each month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer className="aspect-[4/3] sm:aspect-[2/1]">
                      <ChartBars
                        data={userData.monthlyActivity}
                        xAxis={(d) => d.month}
                        yAxis={(d) => 35}
                        categories={[{ name: "quizzes", getValue: (d) => d.quizzes, color: "var(--chart-purple-500)" }]}
                      >
                        <ChartBar />
                      </ChartBars>
                      <ChartTooltip />
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>Your complete quiz history and achievements</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* November 2023 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">November 2023</h3>
                      <div className="space-y-4">
                        {userData.recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                              {activity.type === "quiz" && (
                                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                              {activity.type === "badge" && (
                                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                              {activity.type === "level" && (
                                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {activity.type === "quiz" && `Completed ${activity.category} Quiz`}
                                    {activity.type === "badge" && `Earned ${activity.name} Badge`}
                                    {activity.type === "level" && `Reached Level ${activity.level}`}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                                </div>
                                {activity.type === "quiz" && (
                                  <div className="text-right">
                                    <p className="font-bold">{activity.score} points</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {activity.result} correct
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* October 2023 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">October 2023</h3>
                      <div className="space-y-4">
                        {[...userData.recentActivity].reverse().map((activity, index) => (
                          <div
                            key={`oct-${index}`}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                              {activity.type === "quiz" && (
                                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                              {activity.type === "badge" && (
                                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                              {activity.type === "level" && (
                                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {activity.type === "quiz" && `Completed ${activity.category} Quiz`}
                                    {activity.type === "badge" && `Earned ${activity.name} Badge`}
                                    {activity.type === "level" && `Reached Level ${activity.level}`}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">October 25, 2023</p>
                                </div>
                                {activity.type === "quiz" && (
                                  <div className="text-right">
                                    <p className="font-bold">{activity.score - 50} points</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {activity.result} correct
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
