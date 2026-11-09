import { useState, useEffect } from "react";

export function OperatorDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <section id="operator-dashboard" className="section">
      <div className="shell">
        {loading ? (
          <p className="text-[13px] text-[#7c838d]">Operator dashboard loading…</p>
        ) : (
          <p className="text-[13px] text-[#7c838d]">Operator dashboard ready.</p>
        )}
      </div>
    </section>
  );
}