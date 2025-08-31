export const dynamic = "force-static";
export const dynamicParams = false;

// IMPORTANT: materializamos al menos una ruta para el export estático
export function generateStaticParams() {
  return [{ examId: "demo" }];
}

type Params = { examId: string };
type PageProps = { params: Params };

export default function Page({ params }: PageProps) {
  const id = params?.examId ?? "demo";
  return (
    <section className="animate-fade" style={{ padding: 24 }}>
      <h1>Exam {id}</h1>
      <p>Static placeholder for the GitHub Pages build.</p>
    </section>
  );
}
