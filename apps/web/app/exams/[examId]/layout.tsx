export const dynamic = "force-static";
export const dynamicParams = false;

// Materializa al menos una ruta para la exportación estática
export function generateStaticParams() {
  return [{ examId: "demo" }];
}

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
