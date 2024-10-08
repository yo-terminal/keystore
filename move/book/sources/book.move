/// Module: book
module book::book {
    use std::string::{ String };

    public struct Safety has key {
        id: UID,
        salt: String,
        verifyHash: String,
        verifySalt: String
    }

    public struct Slot has key {
        id: UID,
        creation: u64,
        summary: String,
        root: Option<bool>,
        archive: Option<bool>,
        content: Option<String>,
        contentType: Option<u64>,
        parents: Option<vector<address>>,
    }

    public fun create_safety(
        salt: String,
        verifyHash: String,
        verifySalt: String,
        ctx: &mut TxContext
    ) {
        transfer::transfer(
            Safety {
                id: object::new(ctx),
                salt,
                verifyHash,
                verifySalt
            },
            ctx.sender()
        );
    }

    public fun create_slot(
        creation: u64,
        summary: String,
        root: Option<bool>,
        archive: Option<bool>,
        content: Option<String>,
        contentType: Option<u64>,
        parents: Option<vector<address>>,
        ctx: &mut TxContext
    ) {
        transfer::transfer(
            Slot {
                id: object::new(ctx),
                creation,
                summary,
                root,
                archive,
                content,
                contentType,
                parents,
            },
            ctx.sender()
        );
    }

    public fun remove_slot(slot: Slot) {
        let Slot {
            id,
            creation: _,
            summary: _,
            root: _,
            archive: _,
            content: _,
            contentType: _,
            parents: _,
        } = slot;
        object::delete(id);
    }

    public fun update_slot(
        slot: &mut Slot,
        summary: String,
        root: Option<bool>,
        archive: Option<bool>,
        content: Option<String>,
        contentType: Option<u64>,
        parents: Option<vector<address>>,
    ) {
        slot.summary = summary;
        slot.content = content;
        slot.root = root;
        slot.archive = archive;
        slot.content = content;
        slot.contentType = contentType;
        slot.parents = parents;
    }

    public fun remove_safety(safety: Safety) {
        let Safety {
            id,
            salt: _,
            verifySalt: _,
            verifyHash: _,
        } = safety;
        object::delete(id);
    }

    public fun remove_slots(slots: &mut vector<Slot>) {
        while (!slots.is_empty()) {
            let slot = slots.pop_back();
            remove_slot(slot);
        };
    }
}
// module book::book {
//     use std::string::{ String };
//     use sui::dynamic_object_field as ofield;

//     public struct Book has key {
//         id: UID,
//         salt: String,
//         verifyHash: String,
//         verifySalt: String,
//         slots: vector<u64>
//     }

//     public struct Slot has key, store {
//         id: UID,
//         creation: u64,
//         summary: String,
//         content: Option<String>,
//         parents: vector<u64>
//     }

//       public struct SlotView {
//         key: u64,
//         creation: u64,
//         summary: String,
//         content: Option<String>,
//         parents: vector<u64>
//     }

//     public fun create_book(
//         salt: String,
//         verifyHash: String,
//         verifySalt: String,
//         ctx: &mut TxContext
//     ) {
//         transfer::transfer(
//             Book {
//                 id: object::new(ctx),
//                 salt,
//                 verifyHash,
//                 verifySalt,
//                 slots: vector[]
//             },
//             ctx.sender()
//         );
//     }

//     public fun create_slot(
//         book: &mut Book,
//         creation: u64,
//         summary: String,
//         content: Option<String>,
//         parents: vector<u64>,
//         ctx: &mut TxContext
//     ) {

//         let len = book.slots.length();
//         let key = if(len > 0) book.slots[len - 1] + 1 else 1;
//         book.slots.push_back(key);
//         ofield::add(&mut book.id, key, Slot {
//                 id: object::new(ctx),
//                 creation,
//                 summary,
//                 content,
//                 parents,
//             });
//     }

//     fun delete_slot(book: &mut Book, key: u64) {
//         let Slot {
//             id,
//             creation: _,
//             summary: _,
//             content: _,
//             parents: _
//         } = ofield::remove(&mut book.id, key);
//         object::delete(id);
//     }

//     public fun remove_slot(book: &mut Book, key: u64) {
//         let (res, i) = book.slots.index_of(&key);
//         if(!res) abort 0;

//         book.slots.swap_remove(i);

//         delete_slot(book, key);
//     }

//     public fun update_slot(
//         book: &mut Book,
//         key: u64,
//         summary: String,
//         content: Option<String>,
//         parents: vector<u64>,
//     ) {
//         let slot: &mut Slot = ofield::borrow_mut(&mut book.id, key);
//         slot.summary = summary;
//         slot.content = content;
//         slot.parents = parents;
//     }

//     public fun clear_slots(book: &mut Book) {
//         while (!book.slots.is_empty()) {
//             let key = book.slots.pop_back();
//             delete_slot(book, key);
//         };
//     }

//     public fun delete_book(book: Book) {
//         let Book {
//             id,
//             salt: _,
//             verifySalt: _,
//             verifyHash: _,
//             slots: _
//         } = book;
//         object::delete(id);
//     }

//     public fun get_slots(book: &mut Book): vector<SlotView> {
//         let mut slots: vector<SlotView> = vector[];
//         let mut i  = 0;
//         let len = book.slots.length();
//         while (i < len) {
//             let key = book.slots[i];
//             let slot: &mut Slot = ofield::borrow_mut(&mut book.id, key);
//             slots.push_back(SlotView {
//                 key,
//                 creation: slot.creation,
//                 summary: slot.summary,
//                 content: slot.content,
//                 parents: slot.parents,
//             });
//             i = i + 1;
//         };
//         slots
//     }
// }
