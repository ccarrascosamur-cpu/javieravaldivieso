import React, { useState, useEffect } from 'react';
import { CreditCard, CreditCard as CardIcon, Check, Loader2, ArrowLeft, Printer, Download, Receipt, ExternalLink, ShieldCheck } from 'lucide-react';
import { Appointment } from '../types';

interface PaymentsProps {
  activeAppointment: Appointment | null;
  onPaymentSuccess: (appointment: Appointment) => void;
  onCancel: () => void;
}

type ProviderType = 'webpay' | 'mercadopago' | 'flow';

export default function Payments({ activeAppointment, onPaymentSuccess, onCancel }: PaymentsProps) {
  const [paymentProvider, setPaymentProvider] = useState<ProviderType>('webpay');
  const [status, setStatus] = useState<'idle' | 'processing' | 'portal' | 'success'>('idle');
  const [cardNumber, setCardNumber] = useState('4532  8765  4321  0098');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [isapreCode, setIsapreCode] = useState('');

  useEffect(() => {
    if (activeAppointment) {
      setCardHolder(activeAppointment.patientName);
      
      // Assign fake Isapre codes for simulation
      const codes: Record<string, string> = {
        'Colmena': 'D-48902',
        'Banmédica': 'D-11029',
        'CruzBlanca': 'D-22910',
        'Consalud': 'D-33019',
        'Fonasa': 'F-10293'
      };
      setIsapreCode(codes[activeAppointment.patientPhone] || 'INTEGRA-912');
    }
  }, [activeAppointment]);

  if (!activeAppointment) {
    return (
      <div className="text-center p-8 bg-white border border-sage-100 rounded-xl max-w-md mx-auto">
        <Receipt className="w-12 h-12 text-sage-400 mx-auto mb-4" />
        <h3 className="font-serif text-lg font-bold text-sage-900 mb-2">No hay órdenes pendientes</h3>
        <p className="text-sm text-sage-600 mb-6">Selecciona un programa o reserva un bloque horario para acceder a la pasarela de pagos.</p>
        <button onClick={onCancel} className="px-6 py-2.5 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-xs">Ver Programas</button>
      </div>
    );
  }

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate payment portal redirection
    setTimeout(() => {
      setStatus('portal');
    }, 1500);
  };

  const handleCompletePortalSimulation = () => {
    setStatus('processing');
    setTimeout(() => {
      const updated = { ...activeAppointment, status: 'confirmed' as const };
      setStatus('success');
      onPaymentSuccess(updated);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-sand-100/75 p-4 md:p-8 rounded-2xl border border-sage-200/50 max-w-3xl mx-auto shadow-sm">
      {status !== 'success' && (
        <button onClick={onCancel} className="flex items-center space-x-1.5 text-xs text-sage-700 hover:text-sage-900 font-bold mb-6 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la selección</span>
        </button>
      )}

      {status === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Order Summary Form */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-serif text-lg font-bold text-sage-900">Orden de Compra</h4>
            <div className="bg-white p-5 rounded-xl border border-sage-200/50 space-y-4 shadow-2xs">
              <div className="border-b border-sage-100 pb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sand-500">Paciente</span>
                <p className="text-sm font-bold text-sage-900 leading-tight">{activeAppointment.patientName}</p>
                <p className="text-xs text-sage-500 mt-0.5">RUT: {activeAppointment.patientRut}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sand-500">Detalle de Adquisición</span>
                <p className="text-sm font-bold text-sage-800 leading-snug mt-0.5">{activeAppointment.serviceName}</p>
                <p className="text-xs text-sage-500 mt-0.5">Modalidad: <span className="capitalize font-semibold">{activeAppointment.mode}</span></p>
                {activeAppointment.date && (
                  <p className="text-xs text-sage-500">Agenda: {activeAppointment.date} a las {activeAppointment.timeSlot} hrs</p>
                )}
              </div>

              <div className="border-t border-sage-100 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-sage-900">Total a Pagar</span>
                <span className="text-base font-serif font-black text-sage-800">${activeAppointment.price.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-sage-600 leading-normal bg-sage-50 p-3 rounded-lg border border-sage-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Transacciones protegidas con encriptación SSL de 256 bits operado bajo norma PCI-DSS chilena.</span>
            </div>
          </div>

          {/* Gateway Select & Checkout Form */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="font-serif text-lg font-bold text-sage-900 mb-1">Pasarela de Seguro</h4>
              <p className="text-xs text-sage-500">Selecciona el medio de recaudación oficial en Chile.</p>
            </div>

            {/* Platform Select */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentProvider('webpay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  paymentProvider === 'webpay' ? 'border-sage-700 bg-white shadow-xs' : 'border-sage-200 hover:border-sage-400'
                }`}
              >
                <span className="text-lg">💳</span>
                <span className="text-[10px] font-black text-rose-600 mt-1 uppercase tracking-tighter">Webpay Plus</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentProvider('mercadopago')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  paymentProvider === 'mercadopago' ? 'border-sage-700 bg-white shadow-xs' : 'border-sage-200 hover:border-sage-400'
                }`}
              >
                <span className="text-lg">🤝</span>
                <span className="text-[10px] font-black text-sky-600 mt-1 uppercase tracking-tighter">Mercado Pago</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentProvider('flow')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  paymentProvider === 'flow' ? 'border-sage-700 bg-white shadow-xs' : 'border-sage-200 hover:border-sage-400'
                }`}
              >
                <span className="text-lg">🌊</span>
                <span className="text-[10px] font-black text-blue-800 mt-1 uppercase tracking-tighter">Flow CLP</span>
              </button>
            </div>

            {/* Standard Billing Details */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-sage-700 block mb-1">Nombre en Tarjeta</label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-sage-700 block mb-1">Simular Tarjeta</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-sage-700 block mb-1">CVV / Pin</label>
                  <input
                    type="password"
                    maxLength={3}
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2 border border-sage-300 rounded-lg text-sm bg-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                Pagar con {paymentProvider === 'webpay' ? 'Webpay Plus' : paymentProvider === 'mercadopago' ? 'Mercado Pago' : 'Flow'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay State */}
      {status === 'processing' && (
        <div className="py-16 text-center space-y-4">
          <Loader2 className="w-10 h-10 text-sage-600 animate-spin mx-auto" />
          <h4 className="font-serif text-lg font-bold text-sage-900">Procesando Transacción Segura...</h4>
          <p className="text-xs text-sage-500 max-w-xs mx-auto">Por favor no cierres ni actualices la ventana. El banco está validando los fondos.</p>
        </div>
      )}

      {/* Simulated Chilean Webpay Gateway Screen */}
      {status === 'portal' && (
        <div className="bg-[#f0f2f5] p-6 rounded-2xl border border-slate-300 shadow-xl max-w-md mx-auto relative animate-scale-up">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
            <div className="leading-none">
              <p className="text-[10px] font-black text-slate-400 tracking-wider">COMERCIO ADHERIDO</p>
              <h5 className="font-sans text-xs font-extrabold text-[#0064f9]">MA. IG. VALENZUELA NUTRA</h5>
            </div>
            {paymentProvider === 'webpay' && (
              <span className="text-sm font-black text-[#ff3355] italic">Webpay Plus</span>
            )}
            {paymentProvider === 'mercadopago' && (
              <span className="text-sm font-black text-[#00a6f3]">Mercado Libre</span>
            )}
            {paymentProvider === 'flow' && (
              <span className="text-sm font-black text-sky-700">Flow Checkout</span>
            )}
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 mb-6">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Orden de Compra:</span>
              <span className="font-mono font-semibold">OC-291752</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Monto Total:</span>
              <span className="font-semibold text-slate-900">${activeAppointment.price.toLocaleString('es-CL')} CLP</span>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">TARJETA SIMULADA</span>
              <p className="font-mono text-sm text-slate-800 tracking-wide font-medium">{cardNumber}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-[11px] text-amber-800 leading-snug mb-6 flex items-start gap-2">
            <span>ℹ️</span>
            <span>Esta es una <strong>simulación oficial segura</strong>. No se realizarán cargos reales a tu tarjeta bancaria.</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStatus('idle')}
              className="py-2.5 border border-slate-300 font-bold text-slate-700 bg-white rounded-lg text-xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              Rechazar / Abortar
            </button>
            <button
              onClick={handleCompletePortalSimulation}
              className={`py-2.5 font-bold text-white rounded-lg text-xs transition-all cursor-pointer ${
                paymentProvider === 'webpay' ? 'bg-[#ff3355] hover:bg-[#e02545]' : 'bg-[#00a6f3] hover:bg-[#008dcf]'
              }`}
            >
              Simular Aprobación
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS state with complete downloadable tax-exempt receipt Boleta de honorarios */}
      {status === 'success' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Header check */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-sage-900">¡Pago Recibido Exitosamente!</h4>
            <p className="text-sm text-sage-600 max-w-md mx-auto">
              Tu hora queda agendada con bloqueo permanente. Hemos enviado las credenciales de conexión por WhatsApp y correo electrónico.
            </p>
          </div>

          {/* Interactive Printable Official Tax Boleta de Honorarios */}
          <div className="bg-white border-2 border-sage-200 rounded-xl p-6 md:p-8 max-w-xl mx-auto shadow-lg relative font-sans leading-relaxed text-left">
            
            {/* Stamp / SII Seal */}
            <div className="absolute top-6 right-6 border-2 border-rose-500 p-3 text-center rounded-lg uppercase tracking-tight max-w-[190px] leading-tight select-none rotate-3">
              <p className="text-[8px] font-black text-rose-500">S.I.I. - CHILE</p>
              <p className="text-xs font-black text-rose-600">BOLETA ELECTRÓNICA DE HONORARIOS</p>
              <p className="text-[9px] font-bold text-rose-500">N° 002-918491</p>
            </div>

            {/* Clinician Details */}
            <div className="border-b border-sage-100 pb-4 mb-6">
              <h5 className="font-serif text-lg font-black text-sage-900 leading-tight">MARÍA IGNACIA VALENZUELA</h5>
              <p className="text-xs text-sage-500 font-medium">Nutricion Clínica y Salud Digestiva Integrativa</p>
              <p className="text-xs text-sage-500 font-medium">R.U.T.: 14.810.291-K</p>
              <p className="text-xs text-sage-500 font-medium font-bold">Registro SIS Superintendencia de Salud: N° 481029</p>
              <p className="text-xs text-sage-500 font-medium">Providencia, Santiago, Chile</p>
            </div>

            {/* Receipt metadata details */}
            <div className="space-y-3.5 border-b border-sage-100 pb-5 mb-5 text-xs">
              <div>
                <span className="text-[10px] text-sand-500 font-bold block uppercase tracking-wider">Fecha de Emisión:</span>
                <p className="text-sage-900 font-semibold">2026-05-28 (Santiago, Chile)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-sand-500 font-bold block uppercase tracking-wider">Paciente:</span>
                  <p className="text-sage-900 font-semibold">{activeAppointment.patientName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-sand-500 font-bold block uppercase tracking-wider">R.U.T. Paciente:</span>
                  <p className="text-sage-900 font-semibold">{activeAppointment.patientRut}</p>
                </div>
                <div>
                  <span className="text-[10px] text-sand-500 font-bold block uppercase tracking-wider">Modalidad Acordada:</span>
                  <p className="text-sage-900 font-semibold capitalize">{activeAppointment.mode} {activeAppointment.mode === 'online' ? '(VÍA GOOGLE MEET)' : ''}</p>
                </div>
                <div>
                  <span className="text-[10px] text-sand-500 font-bold block uppercase tracking-wider">Previsión Salud:</span>
                  <p className="text-sage-900 font-semibold capitalize">{activeAppointment.patientPhone || 'Particular'}</p>
                </div>
              </div>
            </div>

            {/* Financials details line items */}
            <div className="space-y-2 mb-6 text-xs bg-sand-50 p-4 rounded-lg">
              <div className="flex justify-between font-bold text-sage-900 leading-tight border-b border-sage-100 pb-2">
                <span>Glosa / Concepto del servicio</span>
                <span>Monto CLP</span>
              </div>
              <div className="flex justify-between text-sage-700">
                <span>Servicio: {activeAppointment.serviceName}</span>
                <span>${activeAppointment.price.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-sage-500 text-[10px] italic">
                <span>* Prestación Fonasa/Isapre autorizable para reintegro en Chile ({isapreCode})</span>
                <span></span>
              </div>
              <div className="flex justify-between border-t border-sage-200/50 pt-2 font-bold text-sm text-sage-900">
                <span>Total Honorarios Recibidos:</span>
                <span>${activeAppointment.price.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            {/* Verification Barcode */}
            <div className="flex items-center justify-between border-t border-sage-100 pt-4 text-[10px] text-sage-500 font-medium">
              <div>
                <p>El emisor se encuentra debidamente inscrito en el SIS.</p>
                <p>Documento oficial emitido conforme a regulación vigente del S.I.I.</p>
              </div>
              {/* Fake Barcode visualization */}
              <div className="flex flex-col items-end">
                <div className="w-24 h-6 bg-slate-200 flex items-center justify-around overflow-hidden select-none">
                  <div className="inline-block w-1.5 h-full bg-slate-800"></div>
                  <div className="inline-block w-0.5 h-full bg-slate-800"></div>
                  <div className="inline-block w-1.5 h-full bg-slate-800"></div>
                  <div className="inline-block w-2.5 h-full bg-slate-800"></div>
                  <div className="inline-block w-0.5 h-full bg-slate-800"></div>
                  <div className="inline-block w-1.5 h-full bg-slate-800"></div>
                </div>
                <span className="text-[8px] font-mono mt-0.5">VERIF-92184019</span>
              </div>
            </div>

          </div>

          {/* Download & Actions Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 bg-white hover:bg-sage-100 border border-sage-200 text-sage-800 rounded-full font-bold text-sm flex items-center space-x-2 cursor-pointer shadow-xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onCancel} // Simply reset/close payment screen
              className="px-6 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-bold text-sm flex items-center space-x-2 cursor-pointer shadow-xs transition-all"
            >
              <span>Volver al Inicio</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
