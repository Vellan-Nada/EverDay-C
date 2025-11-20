import NoteCard from './NoteCard.jsx';

const NotesGrid = ({
  notes,
  isPremium,
  editingNoteId,
  editDraft,
  onStartEdit,
  onEditField,
  onCancelEdit,
  onSaveEdit,
  onDeleteNote,
  onChangeColor,
  colorSavingId,
}) => {
  if (!notes.length) {
    return (
      <div className="notes-empty">
        <p>You don’t have any notes yet. Start by jotting something above.</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isPremium={isPremium}
          isEditing={editingNoteId === note.id}
          draft={editingNoteId === note.id ? editDraft : null}
          onStartEdit={() => onStartEdit(note)}
          onEditField={onEditField}
          onCancelEdit={onCancelEdit}
          onSaveEdit={() => onSaveEdit(note.id)}
          onDelete={() => onDeleteNote(note.id)}
          onChangeColor={(color) => onChangeColor(note.id, color)}
          colorSaving={colorSavingId === note.id}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
