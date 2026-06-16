import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 10000 } }
})

interface Service {
  id: string
  name: string
  url: string
  status: 'healthy' | 'degraded' | 'down'
  response_time_ms: number
  uptime_percent: number
  last_checked: string
}

interface Alert {
  id: string
  service_name: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  timestamp: string
  resolved: boolean
}

const api = axios.create({ baseURL: 'http://localhost:8090/api' })

function Dashboard() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(r => r.data)
  })

  const { data: alerts = [] } = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: () => api.get('/alerts').then(r => r.data)
  })

  const healthy = services.filter(s => s.status === 'healthy').length
  const degraded = services.filter(s => s.status === 'degraded').length
  const down = services.filter(s => s.status === 'down').length

  const statusColor = (s: string) => ({
    healthy: 'text-emerald-400 bg-emerald-400/10',
    degraded: 'text-amber-400 bg-amber-400/10',
    down: 'text-rose-400 bg-rose-400/10'
  }[s] || 'text-gray-400 bg-gray-400/10')

  const statusDot = (s: string) => ({
    healthy: 'bg-emerald-400',
    degraded: 'bg-amber-400',
    down: 'bg-rose-400'
  }[s] || 'bg-gray-400')

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">InfraWatch</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time infrastructure monitoring</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live — updates every 10s
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Services', value: services.length, color: 'text-white' },
          { label: 'Healthy', value: healthy, color: 'text-emerald-400' },
          { label: 'Degraded', value: degraded, color: 'text-amber-400' },
          { label: 'Down', value: down, color: 'text-rose-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl mb-6">
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-semibold">Services</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {services.map(service => (
            <div key={service.id} className="p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${statusDot(service.status)}`} />
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{service.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-0.5">Response</p>
                  <p className="font-mono">{service.response_time_ms}ms</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-0.5">Uptime</p>
                  <p className="font-mono text-emerald-400">{service.uptime_percent}%</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold">Active Alerts</h2>
          {alerts.filter(a => !a.resolved).length > 0 && (
            <span className="bg-amber-400/10 text-amber-400 text-xs px-2 py-1 rounded-full">
              {alerts.filter(a => !a.resolved).length} active
            </span>
          )}
        </div>
        <div className="divide-y divide-gray-800">
          {alerts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg mb-1">✅ No active alerts</p>
              <p className="text-sm">All systems operating normally</p>
            </div>
          ) : alerts.map(alert => (
            <div key={alert.id} className="p-6 flex items-start gap-4">
              <span className={`text-xs px-2 py-1 rounded-full mt-0.5 ${
                alert.severity === 'critical' ? 'bg-rose-400/10 text-rose-400' :
                alert.severity === 'warning' ? 'bg-amber-400/10 text-amber-400' :
                'bg-blue-400/10 text-blue-400'
              }`}>
                {alert.severity}
              </span>
              <div>
                <p className="font-medium text-sm">{alert.service_name}</p>
                <p className="text-gray-400 text-sm mt-0.5">{alert.message}</p>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}