
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weatherData = [
  { day: 'Mon', temperature: 28, rainfall: 30 },
  { day: 'Tue', temperature: 30, rainfall: 20 },
  { day: 'Wed', temperature: 29, rainfall: 15 },
  { day: 'Thu', temperature: 25, rainfall: 40 },
  { day: 'Fri', temperature: 24, rainfall: 35 },
  { day: 'Sat', temperature: 27, rainfall: 10 },
  { day: 'Sun', temperature: 29, rainfall: 5 },
];

const diseaseReports = [
  { id: 1, date: '2023-05-10', plant: 'Tomato', disease: 'Early Blight', status: 'Treated' },
  { id: 2, date: '2023-05-15', plant: 'Cucumber', disease: 'Powdery Mildew', status: 'Pending' },
  { id: 3, date: '2023-05-22', plant: 'Rice', disease: 'Blast', status: 'Treated' },
  { id: 4, date: '2023-06-01', plant: 'Wheat', disease: 'Rust', status: 'Monitoring' },
];

const cropSuggestions = [
  { id: 1, crop: 'Wheat', plantingDate: '2023-10-15', estimatedPrice: '$320/ton' },
  { id: 2, crop: 'Corn', plantingDate: '2023-04-10', estimatedPrice: '$175/ton' },
  { id: 3, crop: 'Soybeans', plantingDate: '2023-05-05', estimatedPrice: '$450/ton' },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Reports</CardTitle>
            <CardDescription className="text-2xl font-bold">24</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600">
              ↗︎ 12% increase from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Crop Plans</CardTitle>
            <CardDescription className="text-2xl font-bold">3</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-600">
              Next harvest: 45 days
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Soil Health Index</CardTitle>
            <CardDescription className="text-2xl font-bold">76/100</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600">
              Nitrogen levels need attention
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>7-day weather and rainfall prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weatherData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="temperature" stroke="#F97316" fillOpacity={1} fill="url(#colorTemp)" />
                  <Area type="monotone" dataKey="rainfall" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorRain)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-gray-500 mt-4">
              <p>Farming advice: <span className="text-agri-green font-medium">Good conditions for irrigation in next 2 days. Hold fertilizer application until after rainfall on Thursday.</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="diseases">
          <TabsList className="mb-4">
            <TabsTrigger value="diseases">Disease Reports</TabsTrigger>
            <TabsTrigger value="crops">Crop Suggestions</TabsTrigger>
            <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diseases" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Recent Disease Reports</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {diseaseReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.plant}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.disease}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.status === 'Treated' 
                            ? 'bg-green-100 text-green-800' 
                            : report.status === 'Pending' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="crops" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Recommended Crops</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planting Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cropSuggestions.map((crop) => (
                    <tr key={crop.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.crop}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.plantingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crop.estimatedPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="soil" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Soil Health Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">pH Level</CardTitle>
                  <CardDescription className="text-2xl font-bold">6.8</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">Optimal range: 6.0-7.0</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Nitrogen (N)</CardTitle>
                  <CardDescription className="text-2xl font-bold">45 ppm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-amber-600">Low - needs supplement</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Phosphorus (P)</CardTitle>
                  <CardDescription className="text-2xl font-bold">28 ppm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">Adequate levels</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Potassium (K)</CardTitle>
                  <CardDescription className="text-2xl font-bold">120 ppm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">Adequate levels</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Organic Matter</CardTitle>
                  <CardDescription className="text-2xl font-bold">3.2%</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">Good level</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Moisture</CardTitle>
                  <CardDescription className="text-2xl font-bold">22%</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">Adequate levels</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Apply nitrogen-rich fertilizer within the next 7 days</li>
                <li>Maintain current irrigation schedule</li>
                <li>Consider adding organic compost to further improve soil structure</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
