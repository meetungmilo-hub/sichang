import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Check, Coins, Gift, MapPin, Recycle, Shell, Sparkles, Ticket, Trash2, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/travel';

export const Route = createFileRoute('/green-island')({
  head: () => ({ meta: [...pageHead('สีชังใส่ใจ', 'ร่วมคัดแยกขยะบนเกาะ รับแต้มตัวอย่าง และแลกส่วนลดหรือร่วมกิจกรรมธนาคารปู').meta] }),
  component: GreenIslandPage,
});

const wasteTypes = [
  { id: 'recycle', name: 'ขยะรีไซเคิล', examples: 'ขวดพลาสติก กระป๋อง และกระดาษ', points: 10, icon: Recycle, color: 'bg-sky-50 text-sky-800' },
  { id: 'general', name: 'ขยะทั่วไป', examples: 'ซองขนม ภาชนะเปื้อนอาหาร', points: 5, icon: Trash2, color: 'bg-stone-100 text-stone-700' },
  { id: 'organic', name: 'ขยะอินทรีย์', examples: 'เศษอาหาร เปลือกผลไม้', points: 8, icon: Waves, color: 'bg-emerald-50 text-emerald-800' },
];

function GreenIslandPage() {
  const [points, setPoints] = useState(120);
  const [logged, setLogged] = useState<string[]>([]);
  const [redeemed, setRedeemed] = useState('');
  const addWaste = (id: string, value: number) => {
    if (logged.includes(id)) return;
    setPoints((current) => current + value);
    setLogged((current) => [...current, id]);
  };
  const redeem = (kind: 'discount' | 'crab') => {
    const cost = kind === 'discount' ? 100 : 150;
    if (points < cost) return;
    setPoints((current) => current - cost);
    setRedeemed(kind === 'discount' ? 'บันทึกสิทธิ์ส่วนลดตัวอย่างแล้ว' : 'บันทึกสิทธิ์ร่วมกิจกรรมธนาคารปูตัวอย่างแล้ว');
  };

  return <main>
    <section className="bg-sea">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-20">
        <div><p className="eyebrow text-primary">TRAVEL LIGHT, LEAVE KINDNESS</p><h1 className="section-title mt-4 text-4xl md:text-5xl">เที่ยวให้สุขใจ<br/>ใส่ใจเกาะสีชัง</h1><p className="mt-5 max-w-xl leading-8 text-muted-foreground">แยกขยะให้ถูกถังที่จุดร่วมกิจกรรม รับแต้มสะสม แล้วเลือกเปลี่ยนแต้มเป็นส่วนลดร้านค้าชุมชนหรือร่วมสนับสนุนธนาคารปู</p><a href="#earn" className="mt-7 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">เริ่มเก็บแต้ม <ArrowRight className="size-4"/></a></div>
        <div className="rounded-xl bg-background p-6 shadow-sm md:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">แต้มของฉัน · ตัวอย่าง</p><p className="mt-2 text-5xl font-semibold text-primary">{points}<span className="ml-2 text-base font-normal">แต้ม</span></p></div><span className="grid size-14 place-items-center rounded-full bg-sand text-primary"><Sparkles/></span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{width: `${Math.min((points / 150) * 100, 100)}%`}}/></div><p className="mt-2 text-xs text-muted-foreground">อีก {Math.max(150-points,0)} แต้ม เพื่อร่วมกิจกรรมธนาคารปู</p><div className="mt-6 flex items-center gap-3 rounded-lg border border-border p-4"><div className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-800"><Check className="size-5"/></div><p className="text-sm">คุณช่วยคัดแยกขยะได้แล้ว <strong>{logged.length}</strong> รายการในรอบนี้</p></div></div>
      </div>
    </section>

    <section id="earn" className="container-site py-16 md:py-20">
      <div className="mb-8"><p className="eyebrow text-muted-foreground">SORT · SCAN · EARN</p><h2 className="section-title mt-3">แยกขยะ รับแต้ม ดูแลเกาะ</h2><p className="mt-2 text-sm text-muted-foreground">นำขยะที่สะอาดและแห้งไปยังจุดร่วมกิจกรรม แล้วให้เจ้าหน้าที่สแกน QR เพื่อยืนยันรายการ</p></div>
      <div className="grid gap-4 md:grid-cols-3">{wasteTypes.map((waste) => { const Icon = waste.icon; const done = logged.includes(waste.id); return <article key={waste.id} className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><span className={`grid size-12 place-items-center rounded-full ${waste.color}`}><Icon className="size-6"/></span><span className="flex items-center gap-1 text-sm font-medium text-primary"><Coins className="size-4"/>+{waste.points}</span></div><h3 className="mt-5 text-lg font-medium">{waste.name}</h3><p className="mt-1 min-h-12 text-sm text-muted-foreground">{waste.examples}</p><Button className="mt-4 w-full" variant={done ? 'secondary' : 'outline'} disabled={done} onClick={() => addWaste(waste.id, waste.points)}>{done ? <><Check/> รับแต้มแล้ว</> : 'จำลองรับแต้ม'}</Button></article>})}</div>
      <p className="mt-4 text-xs text-muted-foreground">แต้มและการกดรับด้านบนเป็นข้อมูลทดลองสำหรับต้นแบบ การใช้งานจริงต้องยืนยันผ่าน QR ของจุดรับและผู้ดูแลโครงการ</p>
    </section>

    <section className="bg-sand py-16 md:py-20"><div className="container-site"><div className="mb-8"><p className="eyebrow text-muted-foreground">YOUR POINTS, YOUR IMPACT</p><h2 className="section-title mt-3">เลือกใช้แต้มให้เกิดความหมาย</h2></div><div className="grid gap-5 md:grid-cols-2">
      <article className="rounded-xl bg-background p-6 md:p-8"><span className="grid size-12 place-items-center rounded-full bg-sky-50 text-sky-800"><Ticket/></span><h3 className="mt-5 text-xl font-medium">ส่วนลดร้านค้าชุมชน</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">แลกแต้มเป็นคูปองส่วนลดสำหรับร้านอาหารหรือกิจกรรมที่เข้าร่วมบนเกาะ</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-sm font-medium">100 แต้ม · คูปอง 20 บาท*</span><Button onClick={() => redeem('discount')} disabled={points < 100}>แลกส่วนลด</Button></div></article>
      <article className="rounded-xl bg-background p-6 md:p-8"><span className="grid size-12 place-items-center rounded-full bg-orange-50 text-orange-800"><Shell/></span><h3 className="mt-5 text-xl font-medium">ร่วมสนับสนุนธนาคารปู</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">นำแต้มไปร่วมกิจกรรมปล่อยปูคืนสู่ทะเลกับผู้ดูแลธนาคารปูในชุมชน</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-sm font-medium">150 แต้ม · 1 สิทธิ์*</span><Button onClick={() => redeem('crab')} disabled={points < 150}>แลกกิจกรรม</Button></div></article>
      </div>{redeemed && <p role="status" className="mt-4 rounded-md bg-background p-4 text-sm text-primary">{redeemed} · โปรดติดต่อผู้ดูแลเพื่อยืนยันสิทธิ์</p>}<p className="mt-4 text-xs text-muted-foreground">*อัตราแลกและรายละเอียดเป็นตัวอย่าง ต้องยืนยันกับร้านค้าและธนาคารปูก่อนเปิดใช้งาน</p></div></section>

    <section className="container-site py-16 md:py-20"><div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-muted-foreground">NEAR YOU</p><h2 className="section-title mt-3">จุดร่วมกิจกรรมบนเกาะ</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">เช็กจุดรับขยะก่อนออกเดินทาง แยกขยะตามป้าย และสอบถามเจ้าหน้าที่เมื่อไม่แน่ใจ</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/routes">ดูเส้นทางเที่ยวเกาะ <ArrowRight/></Link></Button></div><div className="space-y-3">{[{name:'ท่าเรือเกาะสีชัง',type:'จุดคัดแยกขยะ · ตัวอย่าง',note:'เวลาทำการรอยืนยัน',icon:MapPin},{name:'ศูนย์ชุมชน / ธนาคารปู',type:'จุดกิจกรรมและแลกสิทธิ์ · ตัวอย่าง',note:'สถานที่และรอบกิจกรรมรอยืนยัน',icon:Shell}].map((spot) => {const Icon=spot.icon;return <div key={spot.name} className="flex gap-4 rounded-lg border border-border p-5"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-sea text-primary"><Icon className="size-5"/></span><div><h3 className="font-medium">{spot.name}</h3><p className="mt-1 text-sm text-muted-foreground">{spot.type}</p><p className="mt-2 text-xs text-muted-foreground">{spot.note}</p></div></div>})}</div></div></section>
    <section className="bg-primary text-primary-foreground"><div className="container-site flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-medium">เที่ยวสีชังอย่างใส่ใจ</h2><p className="mt-2 text-sm text-primary-foreground/75">วางแผนทริปและช่วยกันดูแลบ้านของเรา</p></div><Button asChild className="bg-background text-primary hover:bg-background/90"><Link to="/packages">เลือกแพ็กเกจ <ArrowRight/></Link></Button></div></section>
  </main>;
}
