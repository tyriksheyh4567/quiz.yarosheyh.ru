"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Search } from "lucide-react"

// Mock leaderboard data
const leaderboardData = {
  daily: [
    { id: 1, name: "Alex Johnson", score: 1250, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
    { id: 2, name: "Maria Garcia", score: 1180, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
    { id: 3, name: "James Wilson", score: 1120, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
    { id: 4, name: "Sarah Chen", score: 980, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
    { id: 5, name: "David Kim", score: 920, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
    { id: 6, name: "Emma Davis", score: 890, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
    { id: 7, name: "Michael Brown", score: 850, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
    { id: 8, name: "Sophia Martinez", score: 820, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
    { id: 9, name: "Daniel Lee", score: 780, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
    { id: 10, name: "Olivia Taylor", score: 750, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
  ],
  weekly: [
    { id: 1, name: "James Wilson", score: 5680, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
    { id: 2, name: "Alex Johnson", score: 5420, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
    { id: 3, name: "Sarah Chen", score: 4950, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
    { id: 4, name: "Maria Garcia", score: 4820, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
    { id: 5, name: "Emma Davis", score: 4650, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
    { id: 6, name: "David Kim", score: 4320, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
    { id: 7, name: "Sophia Martinez", score: 4180, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
    { id: 8, name: "Michael Brown", score: 3950, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
    { id: 9, name: "Olivia Taylor", score: 3820, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
    { id: 10, name: "Daniel Lee", score: 3650, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
  ],
  monthly: [
    { id: 1, name: "Sarah Chen", score: 24680, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
    { id: 2, name: "James Wilson", score: 22450, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
    { id: 3, name: "Alex Johnson", score: 21380, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
    { id: 4, name: "Emma Davis", score: 19750, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
    { id: 5, name: "Maria Garcia", score: 18920, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
    { id: 6, name: "Sophia Martinez", score: 17840, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
    { id: 7, name: "David Kim", score: 16950, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
    { id: 8, name: "Olivia Taylor", score: 15780, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
    { id: 9, name: "Michael Brown", score: 14650, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
    { id: 10, name: "Daniel Lee", score: 13920, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
  ],
  allTime: [
    { id: 1, name: "Sarah Chen", score: 156780, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
    { id: 2, name: "James Wilson", score: 142350, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
    { id: 3, name: "Alex Johnson", score: 138920, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
    { id: 4, name: "Emma Davis", score: 127650, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
    { id: 5, name: "Maria Garcia", score: 118450, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
    { id: 6, name: "David Kim", score: 109780, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
    { id: 7, name: "Sophia Martinez", score: 98650, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
    { id: 8, name: "Michael Brown", score: 87920, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
    { id: 9, name: "Olivia Taylor", score: 76540, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
    { id: 10, name: "Daniel Lee", score: 65780, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
  ],
}

export default function LeaderboardClientPage() {
  const [activeTab, setActiveTab] = useState("daily")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter leaderboard data based on search query
  const filteredData = leaderboardData[activeTab as keyof typeof leaderboardData].filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center text-center py-8">
          <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Leaderboard</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            See who's topping the charts and challenge yourself to climb the rankings!
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="daily" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger
                  value="daily"
                  className="transition-all duration-300 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="transition-all duration-300 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="transition-all duration-300 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="allTime"
                  className="transition-all duration-300 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  All Time
                </TabsTrigger>
              </TabsList>

              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                  <Input
                    type="search"
                    placeholder="Search players..."
                    className="pl-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="daily" className="mt-0">
              <LeaderboardTable data={filteredData} period="Today" />
            </TabsContent>
            <TabsContent value="weekly" className="mt-0">
              <LeaderboardTable data={filteredData} period="This Week" />
            </TabsContent>
            <TabsContent value="monthly" className="mt-0">
              <LeaderboardTable data={filteredData} period="This Month" />
            </TabsContent>
            <TabsContent value="allTime" className="mt-0">
              <LeaderboardTable data={filteredData} period="All Time" />
            </TabsContent>
          </Tabs>

          <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
              <CardDescription>Your current ranking and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-purple-100 dark:hover:bg-purple-900/30 hover-lift">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Rank</div>
                  <div className="text-2xl font-bold">#42</div>
                  <div className="text-sm text-green-600 dark:text-green-400">↑ 5 from yesterday</div>
                </div>
                <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Score</div>
                  <div className="text-2xl font-bold">12,450</div>
                  <div className="text-sm text-green-600 dark:text-green-400">+850 this week</div>
                </div>
                <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quizzes Completed</div>
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">75% correct answers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function LeaderboardTable({ data, period }: { data: any[]; period: string }) {
  return (
    <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Top Players - {period}</CardTitle>
        <CardDescription>The highest scoring quiz champions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Player</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-3 px-4">
                      {user.rank <= 3 ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 hover:scale-110 hover:shadow-md">
                          <Medal
                            className={`w-4 h-4 text-white ${
                              user.rank === 1
                                ? "text-yellow-300 animate-pulse-slow"
                                : user.rank === 2
                                  ? "text-gray-300"
                                  : "text-amber-600"
                            }`}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 font-medium">#{user.rank}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="transition-transform duration-300 hover:scale-110">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Quiz Master</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold group">
                      <span className="transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {user.score.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-500 dark:text-gray-400">
                    No players found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
