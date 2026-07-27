# CS Support Multi-Select Dropdown - Complete Implementation

## Overview
เพิ่มฟีเจอร์ **CS Support Multiple Select Dropdown** ทั้งในโหมด **SF Pull** และ **Manual Entry** ใน `create-job.html`

---

## ✅ Features Implemented

### 1. **SF Pull Mode (Normal Mode)**
- 📍 **ตำแหน่ง**: หลังปุ่ม "Pull SF data" ภายใน SF Pull Mode section
- 🎯 **การทำงาน**:
  - เมื่อ Pull SF data สำเร็จ → โหลดรายชื่อ CS Support จาก SF_DATABASE มาแสดงใน dropdown
  - สามารถเพิ่ม/ลบรายชื่อได้ตามต้องการ
  - Pills แสดงสีเขียว emerald (#059669)

### 2. **Manual Entry Mode**
- 📍 **ตำแหน่ง**: ต่อท้าย Media Type field
- 🎯 **การทำงาน**:
  - Dropdown เปล่า พร้อมให้เลือก CS Support
  - เลือกได้หลายคนพร้อมกัน
  - Pills แสดงสีเขียว emerald (#059669)

---

## 🔧 Technical Implementation

### HTML Structure

#### SF Pull Mode
```html
<div id="sf-pull-mode">
  <!-- Search bar + Pull button -->
  
  <!-- CS Support Dropdown -->
  <div>
    <label>CS Support (เลือกได้หลายรายการ)</label>
    <div id="sf-cs-wrap">
      <button onclick="toggleSFCS(event)">
        <div id="sf-cs-pills">Select CS Support...</div>
        <svg id="sf-cs-chev">...</svg>
      </button>
      <div id="sf-cs-dropdown">...</div>
    </div>
  </div>
</div>
```

#### Manual Entry Mode
```html
<div id="manual-mode">
  <!-- Other fields... -->
  
  <!-- CS Support Dropdown -->
  <div>
    <label>CS Support (เลือกได้หลายรายการ)</label>
    <div id="cs-wrap">
      <button onclick="toggleCS(event)">
        <div id="cs-pills">Select CS Support...</div>
        <svg id="cs-chev">...</svg>
      </button>
      <div id="cs-dropdown">...</div>
    </div>
  </div>
</div>
```

### JavaScript Functions

#### Global Variables
```javascript
var CS_SUPPORT_OPTIONS = [
  { name: 'Natcha Phongprap', role: 'CS Manager' },
  { name: 'Weera Somboon', role: 'CS Coordinator' },
  // ... 6 more CS Support members
];
var _selectedCS = [];      // Manual mode state
var _selectedSFCS = [];    // SF mode state
```

#### Manual Mode Functions
- `toggleCS(e)` - เปิด/ปิด dropdown
- `renderCSOptions()` - แสดงรายการ CS พร้อม checkbox
- `toggleCSItem(name, e)` - เลือก/ยกเลิก CS
- `removeCS(name, e)` - ลบ pill
- `renderCSPills()` - แสดง pills

#### SF Mode Functions
- `toggleSFCS(e)` - เปิด/ปิด dropdown
- `renderSFCSOptions()` - แสดงรายการ CS พร้อม checkbox
- `toggleSFCSItem(name, e)` - เลือก/ยกเลิก CS
- `removeSFCS(name, e)` - ลบ pill
- `renderSFCSPills()` - แสดง pills

#### Helper Functions
```javascript
// ใช้สำหรับแสดงใน SF Result (แบบ read-only pills - ไม่ใช้แล้ว)
function renderCSPillsHTML(csList) { ... }
```

### Data Integration

#### SF_DATABASE Update
เพิ่มฟิลด์ `csSupport` ในทุก quotation:

```javascript
var SF_DATABASE = {
  'PB202604521': {
    // ... existing fields
    csSupport: ['Weera Somboon', 'Kanya Srichai']
  },
  'PB202604518': {
    // ... existing fields
    csSupport: ['Natcha Phongprap', 'Warin Kittipong']
  },
  // ... more quotations
};
```

#### pullSFData() Integration
```javascript
function pullSFData() {
  // ... pull data logic
  
  // Load CS Support from SF data into dropdown
  if (data.csSupport && data.csSupport.length) {
    _selectedSFCS = data.csSupport.slice();
    renderSFCSPills();
  } else {
    _selectedSFCS = [];
    renderSFCSPills();
  }
}
```

### Outside Click Handler
```javascript
document.addEventListener('click', function(e) {
  // Manual mode dropdowns
  ['mg','mt','cs','pk'].forEach(function(pfx){ ... });
  
  // SF mode CS Support dropdown
  var sfCsWrap = document.getElementById('sf-cs-wrap');
  if (sfCsWrap && !sfCsWrap.contains(e.target)) {
    // Close dropdown
  }
});
```

### Mode Toggle Reset
```javascript
function toggleNoPB() {
  // ... mode switch logic
  
  // Reset CS Support selections
  _selectedCS = [];
  _selectedSFCS = [];
  renderCSPills();
  renderSFCSPills();
}
```

---

## 🎨 UI/UX Design

### Color Scheme
- **Pills**: Emerald green
  - Background: `rgba(16,185,129,.10)`
  - Text: `#059669`
  - Border: `1px solid rgba(16,185,129,.25)`

### Display Format
**Dropdown List:**
```
☐ Natcha Phongprap
  CS Manager

☐ Weera Somboon
  CS Coordinator

☐ Warin Kittipong
  CS Support
```

**Selected Pills:**
```
[Natcha Phongprap ×] [Weera Somboon ×] [Kanya Srichai ×]
```

---

## 📊 Mock Data

### CS Support Team (8 คน)
1. **Natcha Phongprap** - CS Manager
2. **Weera Somboon** - CS Coordinator
3. **Warin Kittipong** - CS Support
4. **Suphap Inthanon** - CS Support
5. **Kanya Srichai** - CS Support
6. **Raveewan Kaewmanee** - CS Support
7. **Pornthip Sukjai** - CS Support
8. **Somchai Rattanawong** - CS Support

### SF Database CS Assignments
- **PB202604521**: Weera Somboon, Kanya Srichai
- **PB202604518**: Natcha Phongprap, Warin Kittipong
- **PB202604490**: Suphap Inthanon, Pornthip Sukjai
- **PB202604476**: Raveewan Kaewmanee
- **PB202604432**: Kanya Srichai, Somchai Rattanawong

---

## ✅ Testing Checklist

### SF Pull Mode
- [ ] เปิด create-job.html (ไม่เปิด "No Quotation Number")
- [ ] เห็น CS Support dropdown ว่างเปล่าหลังปุ่ม Pull SF data
- [ ] กรอก PB202604521 → Pull SF data
- [ ] ตรวจสอบ CS Support dropdown แสดง "Weera Somboon" และ "Kanya Srichai"
- [ ] คลิก dropdown สามารถเพิ่ม/ลบ CS ได้
- [ ] ลบ pill ออกได้ทีละตัว
- [ ] Pull quotation อื่น → CS Support เปลี่ยนตามข้อมูล
- [ ] คลิกนอก dropdown → dropdown ปิดอัตโนมัติ

### Manual Entry Mode
- [ ] เปิด "No Quotation Number" toggle
- [ ] เห็น CS Support dropdown หลัง Media Type
- [ ] คลิก dropdown → แสดงรายชื่อ CS ทั้งหมด 8 คน
- [ ] เลือก CS หลายคน → pills แสดงสีเขียว
- [ ] ลบ pill ออกได้ทีละตัว
- [ ] คลิกนอก dropdown → dropdown ปิดอัตโนมัติ

### Mode Switching
- [ ] สลับจาก SF → Manual → CS Support reset เป็นค่าว่าง
- [ ] สลับจาก Manual → SF → CS Support reset เป็นค่าว่าง

---

## 🔄 State Management

### Separate State for Each Mode
```javascript
// Manual mode ใช้ _selectedCS
var _selectedCS = [];

// SF mode ใช้ _selectedSFCS
var _selectedSFCS = [];
```

**เหตุผล**: ป้องกันไม่ให้ state ปนกันระหว่าง 2 โหมด

### Reset on Mode Toggle
เมื่อสลับโหมด → reset ทั้ง `_selectedCS` และ `_selectedSFCS` เป็น empty array

---

## 📁 Files Modified
- `C:\Users\raveewan.ka\Desktop\Claude\Design\CRM\MediaFlow/create-job.html`

---

## 🎯 Key Differences from Previous Version

| Aspect | Before | After |
|--------|--------|-------|
| SF Mode | แสดง CS Support แบบ read-only pills ใน SF result | Dropdown multi-select แยกต่างหาก |
| Manual Mode | Dropdown multi-select | Dropdown multi-select (เหมือนเดิม) |
| State Management | ใช้ state ร่วมกัน | แยก state: `_selectedCS` vs `_selectedSFCS` |
| SF Result Display | แสดง CS Support field | ไม่แสดง (ย้ายไปเป็น dropdown) |
| Auto-populate | ไม่มี | SF mode โหลดค่าจาก SF_DATABASE |

---

## 💡 Notes
- ฟังก์ชัน `renderCSPillsHTML()` ยังคงอยู่ (เผื่อใช้ในอนาคต) แต่ไม่ได้ใช้ใน UI แล้ว
- ทั้ง 2 โหมดใช้ `CS_SUPPORT_OPTIONS` ชุดเดียวกัน
- Dropdown ใน SF mode จะ auto-populate เมื่อ pull data สำเร็จ แต่ยังคงแก้ไขได้
- รองรับการเพิ่ม/ลด CS Support ในอนาคต โดยแก้ที่ `CS_SUPPORT_OPTIONS` เท่านั้น
