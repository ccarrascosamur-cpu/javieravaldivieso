import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, Check, AlertCircle, ShieldCheck, Tag } from 'lucide-react';
import { SERVICE_PLANS } from '../data';
import { ServicePlan, Appointment } from '../types';

interface AgendaOnlineProps {
  initialServiceId?: string;
  onAppointmentConfirmed: (appointment: Appointment) => void;
  onClose?: () => void;
}

export default function AgendaOnline({ initialServiceId, onAppointmentConfirmed, onClose }: AgendaOnlineProps) {
  // Booking Steps: 1 = Service & Mode, 2 = Date & Time, 3 = Patient Details
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServicePlan>(
    SERVICE_PLANS.find(p => p.id === initialServiceId) || SERVICE_PLANS[0]
  );
  const [mode, setMode] = useState<'online' | 'presencial'>('online');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient Details Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rut, setRut] = useState('');
  const [healthProvider, setHealthProvider] = useState('Colmena');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Generate 7 upcoming business dates starting today/tomorrow
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

  useEffect(() => {
    // Generate dates dynamically
    const dates: string[] = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    let current = new Date();
    
    // Skip today if late, or just start tomorrow
    current.setDate(current.getDate() + 1);

    while (dates.length < 7) {
      // Skip Sundays (0)
      if (current.getDay() !== 0) {
        dates.push(current.toLocaleDateString('es-CL', options));
      }
      current.setDate(current.getDate() + 1);
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setSelectedTimeSlot(timeSlots[0]);
  }, []);

  // Sync initialServiceId when changed externally
  useEffect(() => {
    if (initialServiceId) {
      const found = SERVICE_PLANS.find(p => p.id === initialServiceId);
      if (found) {
        setSelectedService(found);
      }
    }
  }, [initialServiceId]);

  // Handle RUT Formatting
  const formatRut = (value: string) => {
    let clean = value.replace(/[^0-9kK]/g, '');
    if (clean.length <= 1) return clean;
    
    let body = clean.slice(0, -1);
    let dv = clean.slice(-1).toUpperCase();
    
    // Format body with dots or leave clear
    let formatted = body;
    if (body.length > 6) {
      formatted = body.slice(0, -6) + '.' + body.slice(-6, -3) + '.' + body.slice(-3);
    } else if (body.length > 3) {
      formatted = body.slice(0, -3) + '.' + body.slice(-3);
    }
    return `${formatted}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setRut(formatted);
  };

  // Basic Chilean RUT verification helper (for UI feedback)
  const validateRut = (rutString: string) => {
    if (!rutString || rutString.length < 8) return false;
    let clean = rutString.replace(/\./g, '').replace(/-/g, '');
    if (clean.length < 8) return false;
    let body = clean.slice(0, -1);
    let dv = clean.slice(-1).toUpperCase();
    
    // Verification digits algorithm (Modulo 11)
    let sum = 0;
    let mul = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * mul;
      mul = mul === 7 ? 2 : mul + 1;
    }
    let res = 11 - (sum % 11);
    let expectedDv = res === 11 ? '0' : res === 10 ? 'K' : res.toString();
    return dv === expectedDv;
  };

  // Submit First Step
  const nextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        setErrorMsg('Por favor selecciona una fecha y bloque de hora disponible.');
        return;
      }
      setErrorMsg('');
      setStep(3);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!name.trim()) return setErrorMsg('Ingresa tu nombre completo.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('Ingresa un correo electrónico válido.');
    if (!phone.trim() || phone.length < 8) return setErrorMsg('Ingresa un teléfono chileno válido (mínimo 8 dígitos).');
    
    const isRutOk = validateRut(rut);
    if (!isRutOk) {
      return setErrorMsg('El RUT ingresado no es válido. Formato esperado: 12.345.678-9');
    }

    // Creating booking appointment entity
    const newAppointment: Appointment = {
      id: 'app-' + Math.floor(Math.random() * 100000),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      mode: mode,
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      patientRut: rut,
      status: 'pending',
      price: selectedService.price
    };

    onAppointmentConfirmed(newAppointment);
  };

  return (
    <div id="agenda" className="bg-white rounded-2xl border border-sage-200/50 shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12">
        
        {/* Progress sidebar / Booking Summary (col-span-4) */}
        <div className="md:col-span-4 bg-sage-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-sage-200/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-sage-900">Resumen de Agenda</h3>
            {onClose && (
              <button onClick={onClose} className="text-xs font-bold text-sage-500 hover:text-sage-700">Cerrar</button>
            )}
          </div>

          <div className="space-y-6">
            {/* Step visual bars */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s === step ? 'bg-sage-700 w-3/5' : s < step ? 'bg-sage-300' : 'bg-sage-200/40'
                  }`}
                />
              ))}
            </div>

            {/* Selected items overview */}
            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block">Servicio seleccionado</span>
                <span className="text-sm font-semibold text-sage-900 leading-tight block mt-0.5">{selectedService.name}</span>
                <div className="flex items-center justify-between text-xs text-sage-600 mt-1">
                  <span>{selectedService.duration}</span>
                  <span className="font-bold text-sage-800">${selectedService.price.toLocaleString('es-CL')} CLP</span>
                </div>
              </div>

              {step > 1 && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block">Modalidad</span>
                  <span className="text-xs font-medium text-sage-900 capitalize block mt-0.5">{mode === 'online' ? '💻 Online (Telemedicina)' : '🏢 Presencial (Providencia)'}</span>
                </div>
              )}

              {step > 2 && selectedDate && selectedTimeSlot && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block">Fecha y Hora</span>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-sage-900 mt-0.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-sage-500" />
                    <span className="capitalize">{selectedDate}</span>
                    <Clock className="w-3.5 h-3.5 text-sage-500 ml-1" />
                    <span>{selectedTimeSlot} hrs</span>
                  </div>
                </div>
              )}
            </div>

            {/* Trust disclaimer */}
            <div className="border-t border-sage-200/50 pt-6">
              <div className="flex items-start space-x-2 text-xs text-sage-600 leading-relaxed bg-white/75 p-3 rounded-lg border border-sage-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>Tu reserva posee <strong>bloqueo garantizado</strong>. Emitimos boletas para reembolso clínico.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Core Wizard Panel (col-span-8) */}
        <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between">
          
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl font-bold text-sage-900 mb-1">1. Selecciona Servicio y Modalidad</h4>
                <p className="text-xs text-sage-500">¿Qué tipo de atención buscas agendar hoy?</p>
              </div>

              {/* Service Select */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-bold text-sage-800">Servicio Disponible</label>
                <div className="grid grid-cols-1 gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {SERVICE_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedService(plan)}
                      className={`p-3.5 rounded-xl text-left border text-sm transition-all cursor-pointer flex items-center justify-between ${
                        selectedService.id === plan.id
                          ? 'border-sage-700 bg-sage-50/50 shadow-xs'
                          : 'border-sage-200 hover:border-sage-500'
                      }`}
                    >
                      <div className="pr-3 leading-tight">
                        <span className="font-bold text-sage-900 block">{plan.name}</span>
                        <span className="text-xs text-sage-500">{plan.duration}</span>
                      </div>
                      <span className="font-bold text-sage-900 flex-shrink-0">${plan.price.toLocaleString('es-CL')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modality Select */}
              <div className="space-y-3 pt-2">
                <label className="text-xs uppercase tracking-wider font-bold text-sage-800">Modalidad de Consulta</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode('online')}
                    className={`p-4 rounded-xl text-center border transition-all cursor-pointer ${
                      mode === 'online'
                        ? 'border-sage-700 bg-sage-50 text-sage-900 font-bold'
                        : 'border-sage-200 hover:border-sage-500 text-sage-600'
                    }`}
                  >
                    <span className="text-xl block mb-1">💻</span>
                    <span className="text-xs block">Online / Telemedicina</span>
                  </button>
                  <button
                    onClick={() => setMode('presencial')}
                    className={`p-4 rounded-xl text-center border transition-all cursor-pointer ${
                      mode === 'presencial'
                        ? 'border-sage-700 bg-sage-50 text-sage-900 font-bold'
                        : 'border-sage-200 hover:border-sage-500 text-sage-600'
                    }`}
                  >
                    <span className="text-xl block mb-1">🏢</span>
                    <span className="text-xs block">Presencial (Providencia)</span>
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-1.5 px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>Siguiente paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl font-bold text-sage-900 mb-1">2. Elige Fecha y Hora</h4>
                <p className="text-xs text-sage-500">Selecciona un bloque disponible para tu asesoría online.</p>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-bold text-sage-800">Próximas Fechas Disponibles</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        selectedDate === date
                          ? 'border-sage-700 bg-sage-50 text-sage-900 font-bold'
                          : 'border-sage-200 hover:border-sage-500 text-sage-600'
                      }`}
                    >
                      <span className="capitalize">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-bold text-sage-800">Horarios Disponibles</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        selectedTimeSlot === time
                          ? 'border-sage-700 bg-sage-50 text-sage-900 font-bold'
                          : 'border-sage-200 hover:border-sage-500 text-sage-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-sage-200 rounded-full text-sage-700 font-bold text-sm hover:bg-sage-50 transition-all cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-1.5 px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>Siguiente paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div>
                <h4 className="font-serif text-xl font-bold text-sage-900 mb-1">3. Tus Datos Personales</h4>
                <p className="text-xs text-sage-500">Ingresa tus datos para confirmar la reserva.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-sage-700 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white"
                    placeholder="Ej: María González"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-sage-700 block mb-1">RUT (Chileno)</label>
                  <input
                    type="text"
                    required
                    value={rut}
                    onChange={handleRutChange}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white font-mono"
                    placeholder="12.345.678-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-sage-700 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white"
                    placeholder="tu@email.cl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-sage-700 block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-sage-700 block mb-1">Previsión de Salud</label>
                <select
                  value={healthProvider}
                  onChange={(e) => setHealthProvider(e.target.value)}
                  className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white"
                >
                  <option value="Colmena">Colmena</option>
                  <option value="Banmédica">Banmédica</option>
                  <option value="CruzBlanca">CruzBlanca</option>
                  <option value="Consalud">Consalud</option>
                  <option value="Nueva Masvida">Nueva Masvida</option>
                  <option value="Fonasa">Fonasa</option>
                  <option value="Particular">Particular / Otro</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-sage-700 block mb-1">Notas Adicionales (Opcional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white resize-none"
                  placeholder="Cuéntame brevemente tu motivo de consulta..."
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-sage-200 rounded-full text-sage-700 font-bold text-sm hover:bg-sage-50 transition-all cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-sm shadow-xs transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Agendar y Pagar Asesoría</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
