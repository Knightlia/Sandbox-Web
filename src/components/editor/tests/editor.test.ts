import m from "mithril";
import Editor from "@/components/editor/ts/Editor";
import EditorModel from "@/components/editor/ts/editormodel";
import createMockFromModule = jest.createMockFromModule;

const elementExists = (element: HTMLElement | null) => {
    expect(element).not.toBeNull();
};

describe("Editor component", () => {

    let editorModelMock: EditorModel;

    beforeEach(() => {
        editorModelMock = createMockFromModule<EditorModel>("@/components/editor/ts/editormodel");
        editorModelMock.updateEditorInputValue = jest.fn();

        m.mount(document.body, { view: () => m(Editor, { model: editorModelMock }) });
    });

    it("renders the editor", () => {
        elementExists(document.querySelector(".editor-view-container"));
    });

    it("calls model on editor input", () => {
        const element = document.querySelector(".editor")!;
        element.dispatchEvent(new Event("input", { bubbles: true }));

        expect(editorModelMock.updateEditorInputValue).toBeCalled();
    });

    it("does not display the placeholder if model placeholder flag is set", () => {
        editorModelMock.placeholderVisible = false;
        m.redraw();

        expect(document.querySelector(".placeholder")).toBeNull();
    });
});
