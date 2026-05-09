import { useApp } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import LeaveRequestForm from '../components/leave/LeaveRequestForm.jsx';

export default function NewRequest() {
  const { t, setRoute } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.request.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.request.subtitle}</p>
      </div>
      <Card>
        <CardHeader title={t.request.title} subtitle={t.request.subtitle} />
        <CardBody>
          <LeaveRequestForm onSubmitted={() => setRoute('my-leaves')} />
        </CardBody>
      </Card>
    </div>
  );
}
