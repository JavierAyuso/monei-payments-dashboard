import { useCharges } from '@/hooks/useCharges'

export default function Payments() {
  const { charges, total, loading, error } = useCharges()

  if (loading) return <div className="p-8">Cargando pagos...</div>
  if (error)
    return <div className="p-8 text-red-500">Error al cargar los pagos: {error.message}</div>

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <p className="text-muted-foreground">{total} pagos en total</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-muted-foreground">
            <th className="pb-3 pr-4">Fecha</th>
            <th className="pb-3 pr-4">Order ID</th>
            <th className="pb-3 pr-4">Importe</th>
            <th className="pb-3 pr-4">Método</th>
            <th className="pb-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge) => (
            <tr key={charge.id} className="border-b text-sm hover:bg-muted/50">
              <td className="py-3 pr-4">
                {new Date(charge.createdAt * 1000).toLocaleDateString('es-ES')}
              </td>
              <td className="py-3 pr-4 font-mono text-xs">{charge.orderId ?? '—'}</td>
              <td className="py-3 pr-4">
                {(charge.amount / 100).toFixed(2)} {charge.currency}
              </td>
              <td className="py-3 pr-4">{charge.paymentMethod?.method ?? '—'}</td>
              <td className="py-3">{charge.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
