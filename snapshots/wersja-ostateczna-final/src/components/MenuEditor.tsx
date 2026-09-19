import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MenuEditor() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error(err);
        setMessage("Nie udało się pobrać menu.");
      });
  }, []);

  const handleSave = async () => {
    setMessage("Zapisywanie...");
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        setMessage("Zapisano pomyślnie! Proszę odświeżyć stronę lub wrócić do menu po paru chwilach.");
      } else {
        setMessage("Błąd: " + (result.error || "Nie udało się zapisać"));
      }
    } catch (err) {
      setMessage("Błąd podczas zapisywania");
    }
  };

  if (!data) return <div className="p-8">Wczytywanie...</div>;

  return (
    <div className="bg-[#f9f8f6] text-[#1a1c1c] min-h-screen font-body-md">
      {/* Sticky Header Bar: always visible at the top */}
      <header className="sticky top-0 z-50 bg-[#e9e0da]/95 backdrop-blur-md border-b border-[#571723]/20 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-display-lg text-[#571723]" style={{ fontFamily: '"Brygada 1918", serif' }}>
            Edytor Menu
          </h1>
          <div className="flex gap-3 sm:gap-4 items-center">
            {message && (
              <span className="text-xs sm:text-sm rounded px-3 py-1.5 bg-[#571723]/10 text-[#571723] font-bold">
                {message}
              </span>
            )}
            <button 
              onClick={() => navigate('/')} 
              className="px-4 py-2 text-sm border border-[#571723]/40 rounded hover:bg-[#571723]/10 transition-colors font-medium text-[#571723]"
            >
              Wróć
            </button>
            <button 
              onClick={handleSave} 
              className="bg-[#571723] text-white px-5 sm:px-6 py-2 rounded shadow text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-[#43121b] transition-colors"
            >
              Zapisz Zmiany
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: scrollable */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 sm:p-8 shadow-xl rounded-2xl border border-outline-variant/20">
          <p className="mb-8 p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 text-sm leading-relaxed">
            Używaj klawisza <b>Enter</b> w polach "Opis", aby przejść do nowej linii tak, jak będzie to widoczne na stronie. Zapisanie nadpisze plik źródłowy. Odśwież stronę po zapisie.
          </p>

        {Object.entries(data).map(([mainCategory, sections]: [string, any]) => (
          <div key={mainCategory} className="mb-12">
            <h2 className="text-2xl font-bold bg-[#e9e0da] text-[#571723] p-4 rounded uppercase tracking-widest">{mainCategory === 'food' ? '🔥 POTRAWY' : '🍹 KOKTAJLE'}</h2>
            
            {(sections as any[]).map((section: any, sectionIdx: number) => (
              <div key={sectionIdx} className="mt-6 border border-gray-200 rounded p-6 shadow-sm ml-4 border-l-4 border-l-[#571723]">
                <div className="flex flex-col gap-2 mb-6 p-4 bg-gray-50 rounded">
                  <label className="font-bold text-xs uppercase opacity-70">Nazwa Sekcji (Kategoria)</label>
                  <input className="border p-2 rounded" value={section.category || ''} onChange={e => {
                    const newData = {...data};
                    newData[mainCategory][sectionIdx].category = e.target.value;
                    setData(newData);
                  }} />
                  <label className="font-bold text-xs uppercase opacity-70 mt-2">Opis sekcji (opcjonalny)</label>
                  <textarea className="border p-2 rounded min-h-[80px]" value={section.description || ''} onChange={e => {
                    const newData = {...data};
                    newData[mainCategory][sectionIdx].description = e.target.value;
                    setData(newData);
                  }} />
                </div>

                <div className="pl-4 border-l-2 border-gray-100 flex flex-col gap-6">
                  {section.items && section.items.map((item: any, itemIdx: number) => (
                    <div key={itemIdx} className="flex flex-col gap-2 p-4 bg-white border border-gray-100 rounded shadow-sm">
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                          <label className="font-bold text-xs uppercase opacity-70">Nazwa dania/koktajlu</label>
                          <input className="border p-2 rounded" value={item.name || ''} onChange={e => {
                            const newData = {...data};
                            newData[mainCategory][sectionIdx].items[itemIdx].name = e.target.value;
                            setData(newData);
                          }} />
                        </div>
                        <div className="flex flex-col gap-1 w-[120px]">
                          <label className="font-bold text-xs uppercase opacity-70">Cena</label>
                          <input className="border p-2 rounded" value={item.price || ''} onChange={e => {
                            const newData = {...data};
                            newData[mainCategory][sectionIdx].items[itemIdx].price = e.target.value;
                            setData(newData);
                          }} />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 mt-2">
                        <label className="font-bold text-xs uppercase opacity-70 text-blue-600 flex justify-between">
                          <span>Opis (tu używaj Enterów)</span>
                        </label>
                        <textarea className="border border-blue-200 outline-blue-400 p-3 rounded min-h-[100px] leading-relaxed" value={item.description || ''} onChange={e => {
                          const newData = {...data};
                          newData[mainCategory][sectionIdx].items[itemIdx].description = e.target.value;
                          setData(newData);
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ))}

      </div>
    </main>
  </div>
);
}
