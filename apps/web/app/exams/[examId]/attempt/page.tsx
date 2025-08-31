export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { examId: string };

export default function AttemptPage({ params }: { params: Params }) {
  const id = params?.examId ?? "demo";
  return (
    <section className="animate-fade" style={{ padding: 24 }}>
      <h1>Attempt for exam {id}</h1>
      <p>Static placeholder for the GitHub Pages export.</p>
    </section>
  );
}