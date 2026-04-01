# Eventos Ativas — Desktop Design Proposal

## Current Issues
- Gambar event warna-warni saling tabrakan, bikin noisy
- Teks numpuk di atas gambar yang ramai, sulit dibaca
- Layout grid terlalu padat, gak ada breathing room

---

## Proposed Layout

### Grid: 4 columns, 2 rows
```
[Card 1] [Card 2] [Card 3] [Card 4]
[Card 5] [Card 6] [Card 7] [Card 8]
```

### Card Structure (ratio 1:2 — portrait tall)
```
┌──────────────────────┐
│                      │
│   IMAGE (top 60%)    │  ← Foto event, object-fit:cover
│   aspect-ratio 1:2   │     object-position:top
│   dimmed overlay     │     brightness(.5) + dark gradient bawah
│                      │
├──────────────────────┤
│ ● BADGE              │  ← Semanal · Ativo / Especial · VIP / etc
│ EVENT NAME           │  ← Oswald, bold, uppercase
│ Detail text          │  ← 1 line, dimmed
│ Prize info           │  ← Gold accent, optional
│ ▶ CTA →              │  ← Colored per event
└──────────────────────┘
```

### How it cleans up:
1. **Image confined to top area** — foto tetap ada tapi di-crop rapi dalam frame 1:2
2. **Text area SEPARATE from image** — di bawah gambar, solid dark background, gak overlap
3. **Dim overlay on image** — gambar tetap visible tapi gak noisy, brightness ~50%
4. **Consistent card height** — semua card sama tinggi krn ratio fixed
5. **Thin left border** — 3px warna accent per event (merah, hijau, biru, etc)
6. **Gap 1px** — grid line tipis aja biar rapi
7. **Hover** — gambar sedikit zoom + brighten, card naik -4px

### Color Scheme
- Card background: `#0D0D0D` (--s)
- Text area: `#0D0D0D`
- Image overlay: gradient hitam dari bawah 30%
- Badge: outline style, warna sesuai event
- Prize: gold dimmed `rgba(212,160,23,.65)`
- CTA: warna event, opacity .6 → 1 on hover

### Mobile
- Tetap carousel horizontal swipe + auto-slide (sudah ada)
- Gambar full visible (img + shade layer ON)

---

## Questions / Adjustments Needed
- [ ] Mau ratio 1:2 exact atau boleh dikurangin sedikit (misal 2:3)?
- [ ] Gambar event mau di-dim berapa persen? (saat ini 50%)
- [ ] Ada perubahan urutan event?
- [ ] Badge "DESTAQUE" tetap di featured cards?
- [ ] Mau ada border/separator antar row atau flat aja?

---

Kirim balik file ini dengan catatan/revisi, nanti saya langsung implement.
