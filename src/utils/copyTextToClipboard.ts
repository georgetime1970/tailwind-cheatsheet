/**
 * 复制文本到剪贴板（兼容移动端和PC端）
 * @param text 要复制的文本
 * @returns 返回一个Promise，表示是否复制成功
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    // 方法1: 首选现代剪贴板API
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 方法2: 回退到execCommand方法（兼容旧浏览器）
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // 避免在页面中可见
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.select();

    // 处理iOS设备的选择范围问题
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    let success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch (err) {
    console.error("复制到剪贴板失败:", err);
    return false;
  }
}
